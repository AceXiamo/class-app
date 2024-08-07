<template>
  <view class="h-full bg-white flex flex-col items-center justify-center">
    <view class="h-min">
      <image class="h-20 mb-10" src="@/static/images/logo_icon.png" mode="aspectFit"></image>
      <button
        class="bg-black rounded-full text-white"
        open-type="getPhoneNumber"
        @getphonenumber="onGetphonenumber"
      >
        <text class="icon-phone"></text>
        手机号快捷登录
      </button>
    </view>
    <view class="absolute bottom-8 flex" :class="{ animate__shakeY: isAgreePrivacyShakeY }">
      <label @tap="isAgreePrivacy = !isAgreePrivacy">
        <radio color="#000" :checked="isAgreePrivacy" />
      </label>

      <view>
        <view>登录/注册即视为你同意品挚</view>
        <view class="flex">
          <navigator class="link" hover-class="none" url="./protocal">《服务条款》</navigator>
          和
          <view class="link" @tap="onOpenPrivacyContract">《隐私协议》</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { postLoginWxMinAPI } from '@/api/user'
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
  const { encryptedData, iv } = ev.detail
  // console.log('encryptedData:', encryptedData, 'iv:', iv)
  const res = await postLoginWxMinAPI({ code, encryptedData, iv })
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
