<template>
  <view class="h-full bg-white flex flex-col items-center justify-center relative">
    <view class="bg-[#E33531] w-full flex items-center justify-center absolute top-0">
      <image
        class="w-full"
        src="https://chambers.oss-cn-shenzhen.aliyuncs.com/20241208/4080b67a-24ce-4aa6-884a-30ba0aa7ac40-WechatIMG114_38776.jpg"
        mode="aspectFit"
      ></image>
    </view>
    <view class="h-min flex flex-col items-center justify-center">
      <!-- <image
        class="h-20 w-20 rounded-full bg-[#E33531] mb-10"
        src="@/static/images/logo_icon.png"
        mode="aspectFit"
      ></image> -->
      <button
        v-if="!isAgreePrivacy"
        class="bg-[#E33531] rounded-full text-white"
        @click="checkedAgreePrivacy"
      >
        <text class="icon-phone"></text>
        手机号快捷登录
      </button>
      <button
        v-else
        class="bg-[#E33531] rounded-full text-white"
        open-type="getPhoneNumber"
        @getphonenumber="onGetphonenumber"
      >
        <text class="icon-phone"></text>
        手机号快捷登录
      </button>
    </view>
    <view class="absolute bottom-8 flex px-8" :class="{ animate__shakeY: isAgreePrivacyShakeY }">
      <label @tap="isAgreePrivacy = !isAgreePrivacy">
        <radio color="#E33531" :checked="isAgreePrivacy" />
      </label>

      <view class="text-[#E33531]">
        <view
          >登录/注册即视为你同意深圳市廉江商会<text class="link" @tap="onOpenPrivacyContract"
            >《隐私协议》</text
          ></view
        >
        <!-- <view class="flex">
          <navigator class="link" hover-class="none" url="./protocal">《服务条款》</navigator>
          和
          <view class="link" @tap="onOpenPrivacyContract">《隐私协议》</view>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { postLoginWxMinAPI, loginWithCode } from '@/api/user'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { LoginResult } from '@/types/member'
import { useMemberStore } from '@/stores'

// 获取 code 登录凭证
let code = ''
onLoad(async () => {
  const res = await uni.login()
  code = res.code
  // console.log('code:', code)
})

// 获取用户手机号码
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  await checkedAgreePrivacy()
  console.log(ev)
  if (ev.detail.errMsg == 'getPhoneNumber:fail user deny') {
    return
  }
  const { encryptedData, iv } = ev.detail
  const res = await postLoginWxMinAPI({ code, encryptedData, iv })
  if (res.code != 0) {
    uni.showToast({ icon: 'none', title: '登录失败' })
    return
  }
  // console.log('登录结果:', res.data)
  loginSuccess(res.data)
}

const loginSuccess = (profile: LoginResult) => {
  console.log('登录成功', profile)
  // 保存会员信息
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  // 成功提示
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    // 页面跳转
    // uni.switchTab({ url: '/pages/my/index' })
    uni.navigateBack()
  }, 500)
}

// 请先阅读并勾选协议
let isAgreePrivacy = ref(false)
let isAgreePrivacyShakeY = ref(false)
const checkedAgreePrivacy = async () => {
  if (!isAgreePrivacy.value) {
    uni.showToast({
      icon: 'none',
      title: '请先阅读并勾选协议',
    })
    // 震动提示
    isAgreePrivacyShakeY.value = true
    setTimeout(() => {
      isAgreePrivacyShakeY.value = false
    }, 500)
    // 返回错误
    return Promise.reject(new Error('请先阅读并勾选协议'))
  }
}

const onOpenPrivacyContract = () => {
  // #ifdef MP-WEIXIN
  // 跳转至隐私协议页面
  wx.openPrivacyContract({})
  // #endif
}
</script>

<style lang="scss" scoped>
@keyframes animate__shakeY {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -5rpx);
  }

  100% {
    transform: translate(0, 0);
  }
}

.animate__shakeY {
  animation: animate__shakeY 0.2s ease-in-out 3;
}
</style>
