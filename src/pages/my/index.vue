<template>
  <!-- 顶部 -->
  <view
    class="w-full z-30 fixed top-0 overflow-y-hidden flex bg-[#F7F7F7]"
    :style="{ paddingTop: `${statusBar}px` }"
  >
    <view
      class="w-full flex items-center justify-center text-[#333] text-base font-medium z-9999"
      :style="{ height: `${customBar}px` }"
      >我的
    </view>
  </view>

  <view class="overflow-auto text-sm h-full relative">
    <!-- 个人信息 -->
    <view
      class="w-auto relative flex flex-col pb-[46rpx] overflow-hidden min-h-[102rpx] mx-[20rpx]"
    >
      <view class="w-full z-10" :style="{ paddingTop: `${statusBar}px` }">
        <view
          class="w-full flex items-center justify-center text-[#333] text-base font-medium"
          :style="{ height: `${customBar}px` }"
        >
        </view>
      </view>
      <view
        v-if="profile"
        class="flex z-10 m-[-1rpx] mt-[42rpx] bg-white p-[40rpx_50rpx] rounded-[15rpx] flex-col"
      >
        <view class="flex justify-between">
          <view class="relative w-20 h-20 flex justify-center">
            <image mode="aspectFill" class="w-20 h-20 rounded-full" :src="info?.avatar"></image>
          </view>
          <view class="text-[28rpx] flex flex-col">
            <view class="flex flex-col items-end gap-[5rpx]">
              <text class="text-[#333] text-[32rpx]">{{
                roleArr.find((item: any) => item.value == info?.status)?.label
              }}</text>
              <text class="text-[#333] text-[32rpx]">
                {{ roleArr.find((item: any) => item.value == info?.position)?.label }}
              </text>
            </view>
            <view class="font-bold text-[36rpx] text-[#333] mt-[30rpx] ml-auto">{{
              info?.name
            }}</view>
          </view>
        </view>

        <view class="flex flex-col gap-[20rpx] mt-[100rpx]" v-if="info?.college">
          <view class="flex items-center font-bold">
            <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
            企业职务：
          </view>
          <view class="flex flex-col gap-[10rpx]">
            <view class="text-[#666]" v-for="str in info.college?.split(',')" :key="str">
              {{ str }}
            </view>
          </view>
        </view>

        <view class="flex flex-col gap-[20rpx] mt-[50rpx]" v-if="info?.bussiness">
          <view class="flex items-center font-bold">
            <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
            社会职务：
          </view>
          <view class="flex flex-col gap-[10rpx]">
            <view class="text-[#666]" v-for="str in info.bussiness?.split(',')" :key="str">
              {{ str }}
            </view>
          </view>
        </view>

        <view class="w-full flex items-center h-[44rpx] mt-[50rpx]">
          <view class="text-xs ml-auto" @tap="toInfo">编辑个人资料</view>
        </view>
      </view>
      <view
        v-if="!profile"
        @tap="toLogin"
        class="flex m-4 justify-center py-[20rpx] mt-[50rpx] border-solid bg-[#92003F] border-white border-[1rpx] rounded-[16rpx] text-white text-[26rpx] z-10 active:opacity-[0.7]"
      >
        登录
      </view>
      <view
        v-if="profile"
        @tap="logout"
        class="flex m-4 justify-center py-[20rpx] mt-[50rpx] border-solid bg-[#92003F] border-white border-[1rpx] rounded-[16rpx] text-white text-[26rpx] z-10 active:opacity-[0.7]"
      >
        退出登录
      </view>
    </view>
    <view class="w-full h-11"></view>
  </view>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { onShow } from '@dcloudio/uni-app'
import { ref, toRefs } from 'vue'
import { getMyData, getInfo_1 } from '@/api/app/my'
import SystemStore from '@/utils/uniapp/system'
import { storeToRefs } from 'pinia'
import collapse from '@/components/collapse/index.vue'
import { formatNumber } from '@/utils/tools'

const { statusBar, customBar } = storeToRefs(SystemStore())
// console.log(statusBar)

const { profile } = toRefs(useMemberStore())
// let profile = ref<any>(null)
let myData: any = ref({})
let info = ref()

const roleArr = ref([
  { label: '秘书处', value: 3 },
  { label: '理事', value: 4 },
  { label: '副会长', value: 5 },
  { label: '常务副会长', value: 6 },
  { label: '监事长', value: 7 },
  { label: '执行会长', value: 8 },
  { label: '名誉会长', value: 9 },
  { label: '会长', value: 10 },
])

const logout = () => {
  useMemberStore().clearProfile()
}

onShow(async () => {
  // profile.value = memberStore.profile
  // console.log('profile', profile.value)
  if (profile.value) {
    const result = await getInfo_1()
    info.value = result.data
    if (profile.value.userInfo.status === 4) {
      const { data } = await getMyData()
      myData.value = data
    }
  }

  // toPostRecommend()
})

const toNotice = () => {
  uni.navigateTo({ url: '/pages/my/notice/index' })
}

const toLogin = () => {
  uni.navigateTo({ url: '/pages/login/login' })
}

const toInfo = () => {
  uni.navigateTo({ url: '/pages/my/info/info' })
}

const toPostRecommend = () => {
  uni.navigateTo({ url: '/pages/my/recommend/postRecommend' })
}

const toCreateRecommend = () => {
  uni.navigateTo({ url: '/pages/my/recommend/createRecommend' })
}

const toReceiveRecommend = () => {
  uni.navigateTo({ url: '/pages/my/recommend/receiveRecommend' })
}

const toGuestList = () => {
  uni.navigateTo({ url: '/pages/my/guestList/index' })
}

const toInterviewList = () => {
  uni.navigateTo({ url: '/pages/my/interview/interviewList' })
}

const toCreateInterview = () => {
  uni.navigateTo({ url: '/pages/my/interview/createInterview' })
}

const toActivities = () => {
  uni.navigateTo({ url: '/pages/my/activity/activities' })
}

const toAttendance = () => {
  uni.navigateTo({ url: '/pages/my/activity/attendance' })
}
</script>

<style lang="scss" scoped>
::v-deep .uni-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0);
}

::v-deep .uni-collapse {
  background-color: rgba(255, 255, 255, 0);
}
</style>
