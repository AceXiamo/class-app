<template>
  <!-- 顶部 -->
  <view
    class="w-full z-30 fixed top-0 overflow-y-hidden flex"
    :style="{ paddingTop: `${statusBar}px` }"
  >
    <image
      src="/static/images/bg-my.png"
      class="w-full h-[532rpx] absolute top-0"
      mode="scaleToFill"
    />
    <view
      class="w-full flex items-center justify-center text-white text-base font-medium z-9999"
      :style="{ height: `${customBar}px` }"
      >我的
    </view>
  </view>

  <view class="overflow-auto text-sm h-full relative">
    <!-- 个人信息 -->
    <view
      class="w-full relative flex flex-col pb-[46rpx] overflow-hidden rounded-[46rpx] min-h-[102rpx]"
    >
      <image
        src="/static/images/bg-my.png"
        class="w-full h-full absolute top-0 left-0"
        mode="scaleToFill"
      />
      <view class="w-full z-10" :style="{ paddingTop: `${statusBar}px` }">
        <view
          class="w-full flex items-center justify-center text-white text-base font-medium"
          :style="{ height: `${customBar}px` }"
        >
        </view>
      </view>

      <view v-if="profile" class="flex z-10 m-[-1rpx] mt-[42rpx] pl-[52rpx] pr-[30rpx]">
        <!-- <view class="flex z-10 m-[-1rpx] mt-[42rpx] pl-[52rpx] pr-[30rpx]"> -->
        <view class="relative w-20 h-20 flex justify-center">
          <image mode="aspectFill" class="w-20 h-20 rounded-full" :src="info?.avatar"> </image>
          <view v-if="info?.leadership" class="absolute bottom-[14rpx] w-full flex justify-center">
            <image
              src="/static/images/bg-my-team.png"
              class="w-[168rpx] h-[50rpx] absolute top-0"
            />
            <text class="text-white absolute top-0.75 text-sm">{{ info?.leadership }}</text>
          </view>
        </view>
        <view class="w-full ml-6 text-[28rpx] flex flex-col text-white">
          <view class="font-medium text-xl h-[44rpx]">{{ info?.name }}</view>

          <view>
            <view v-if="info?.industry" class="w-full break-all line-clamp-1 mt-2 h-[44rpx]"
              >行业：{{ info?.industry }}
            </view>
          </view>

          <view class="w-full flex h-[44rpx]">
            <view class="flex-2 break-all line-clamp-1flex-2 break-all line-clamp-1">{{
              info?.company
            }}</view>
            <view class="ml-3 flex-1 break-all line-clamp-1 flex-1 break-all line-clamp-1">{{
              info?.position
            }}</view>
          </view>

          <view class="w-full flex items-center h-[44rpx] mt-1">
            <image src="/static/images/icon-edit.png" class="w-[34rpx] h-[34rpx]" />
            <view class="text-xs ml-[10rpx]" @tap="toInfo">修改个人商务信息</view>
          </view>
        </view>
      </view>

      <!-- 标签 -->
      <View v-if="profile && info?.tags.length > 0" class="mt-3 z-10 ml-[44rpx]">
        <!-- <View class="mt-3 z-10 ml-[44rpx]"> -->
        <!-- 折叠组件 -->
        <collapse
          :width="600"
          :px="16"
          :my="8"
          :height="42"
          :textColor="'white'"
          :borderColor="'white'"
          :borderRadius="9999"
          :borderWidth="1"
          :fontSize="24"
          :marginRight="18"
          :dataSource="info?.tags"
        />
      </View>

      <view
        @tap="toLogin"
        v-if="!profile"
        class="flex m-4 border-solid border-white border-[1rpx] rounded-[16rpx] text-white text-xl py-6 pl-4 z-10 active:opacity-[0.7]"
      >
        点击登录
      </view>
    </view>

    <!-- 我的数据 -->
    <view
      v-if="profile && profile?.userInfo.status == 4"
      class="px-4 mt-6 text-repeat-33 text-[30rpx]"
    >
      <!-- <view v-if="profile" class="px-4 mt-6 text-repeat-33 text-[30rpx]"> -->
      <view class="font-bold text-base mb-2.5 flex items-center">
        <image src="/static/images/icon-data.png" class="w-4.5 h-4.5 mr-2" />
        <view>我的数据</view>
      </view>
      <view class="bg-white h-[400rpx] rounded-[16rpx] flex flex-col pt-[26rpx] pb-[22rpx]">
        <view class="flex text-center flex-1 items-center">
          <view @tap="toPostRecommend" class="flex-1">
            <view>累计给出引荐</view>
            <view class="h-[50rpx] mt-1.25 text-[#92003F] text-xl font-bold">{{
              formatNumber(myData?.recommendNum || 0)
            }}</view>
          </view>
          <view @tap="toPostRecommend" class="flex-1">
            <view>给出引荐成交金额</view>
            <view class="h-[50rpx] mt-1.25 text-[#92003F] text-xl font-bold"
              >￥{{ formatNumber(myData?.submitMoneySum || 0 || 0) }}
            </view>
          </view>
        </view>
        <view class="flex text-center flex-1 items-center">
          <view @tap="toReceiveRecommend" class="flex-1">
            <view>累计收到引荐</view>
            <view class="h-[50rpx] mt-1.25 text-[#92003F] text-xl font-bold">{{
              formatNumber(myData?.receiveRecommendNum || 0)
            }}</view>
          </view>
          <view @tap="toReceiveRecommend" class="flex-1">
            <view>收到引荐成交金额</view>
            <view class="h-[50rpx] mt-1.25 text-[#92003F] text-xl font-bold"
              >￥{{ formatNumber(myData?.harvestMoneySum || 0 || 0) }}
            </view>
          </view>
        </view>
      </view>
      <view class="mt-2.5 py-4 rounded-[16rpx] bg-white">
        <view class="flex text-center">
          <view @tap="toInterviewList" class="flex-1">
            <view>走访数量</view>
            <view class="mt-1.25 text-[#92003F] text-xl font-bold">{{
              formatNumber(myData?.visitNum || 0)
            }}</view>
          </view>
          <view @tap="toGuestList" class="flex-1">
            <view>嘉宾数量</view>
            <view class="mt-1.25 text-[#92003F] text-xl font-bold">{{
              formatNumber(myData?.guestNum || 0)
            }}</view>
          </view>
          <view @tap="toAttendance" class="flex-1">
            <view>全勤月数</view>
            <view class="mt-1.25 text-[#92003F] text-xl font-bold"
              >{{ myData?.fullAttendanceMonth || 0 }}/{{ myData?.monthNum || 0 }}</view
            >
          </view>
        </view>
      </view>
    </view>

    <!-- 我的引荐 -->
    <view v-if="profile && profile?.userInfo.status == 4" class="px-4 mt-6">
      <!-- <view v-if="profile" class="px-4 mt-6"> -->
      <view class="font-bold text-base mb-2.5 flex items-center">
        <image src="/static/images/icon-recommend.png" class="w-4.5 h-4.5 mr-2" />
        <view>我的引荐</view>
      </view>
      <view class="flex flex-col px-4 rounded-[16rpx] bg-white">
        <view
          @tap="toPostRecommend"
          class="h-12.5 flex items-center border-solid border-0 border-b-[1rpx] border-[#f0f0f0] active:opacity-[0.7]"
        >
          <view class="flex-1">我给出的引荐</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
        <view
          @tap="toReceiveRecommend"
          class="h-12.5 flex items-center border-solid border-0 border-b-[1rpx] border-[#f0f0f0] active:opacity-[0.7]"
        >
          <view class="flex-1">我收到的引荐</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
        <view @tap="toCreateRecommend" class="h-12.5 flex items-center active:opacity-[0.7]">
          <view class="flex-1">创建一个引荐</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
      </view>
    </view>

    <!-- 我的走访 -->
    <view v-if="profile && profile?.userInfo.status == 4" class="px-4 mt-6">
      <!-- <view v-if="profile" class="px-4 mt-6"> -->
      <view class="font-bold text-base mb-2.5 flex items-center">
        <image src="/static/images/icon-interview.png" class="w-4.5 h-4.5 mr-2" />
        <view>我的走访</view>
      </view>
      <view class="flex flex-col px-4 rounded-[16rpx] bg-white">
        <view
          @tap="toInterviewList"
          class="h-12.5 flex items-center border-solid border-0 border-b-[1rpx] border-[#f0f0f0] active:opacity-[0.7]"
        >
          <view class="flex-1">我的走访列表</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
        <view @tap="toCreateInterview" class="h-12.5 flex items-center active:opacity-[0.7]">
          <view class="flex-1">录入一个点对点走访</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
      </view>
    </view>

    <!-- 我的嘉宾 -->
    <view v-if="profile && profile?.userInfo.status == 4" @tap="toGuestList" class="px-4 mt-6">
      <!-- <view v-if="profile" class="px-4 mt-6"> -->
      <view class="font-bold text-base mb-2.5 flex items-center">
        <image src="/static/images/icon-activity.png" class="w-4.5 h-4.5 mr-2" />
        <view>我的嘉宾</view>
      </view>
      <view class="flex flex-col px-4 rounded-[16rpx] bg-white">
        <view @tap="toGuestList" class="h-12.5 flex items-center active:opacity-[0.7]">
          <view class="flex-1">我的嘉宾列表</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
      </view>
    </view>

    <!-- 我的活动 -->
    <view
      v-if="(profile && profile?.userInfo.status == 3) || profile?.userInfo.status == 4"
      class="px-4 mt-6"
    >
      <!-- <view v-if="profile" class="px-4 mt-6"> -->
      <view class="font-bold text-base mb-2.5 flex items-center">
        <image src="/static/images/icon-activity.png" class="w-4.5 h-4.5 mr-2" />
        <view>我的活动</view>
      </view>
      <view class="flex flex-col px-4 rounded-[16rpx] bg-white">
        <view
          @tap="toAttendance"
          class="h-12.5 flex items-center border-solid border-0 border-b-[1rpx] border-[#f0f0f0] active:opacity-[0.7]"
        >
          <view class="flex-1">我的出勤情况</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
        <view @tap="toActivities" class="h-12.5 flex items-center active:opacity-[0.7]">
          <view class="flex-1">我参加的活动</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
      </view>
    </view>

    <!-- 我的嘉宾 -->
    <view v-if="profile && profile?.userInfo.status == 4" @tap="toGuestList" class="px-4 mt-6">
      <!-- <view v-if="profile" class="px-4 mt-6"> -->
      <view class="font-bold text-base mb-2.5 flex items-center">
        <image src="/static/images/icon-notice.png" class="w-4.5 h-4.5 mr-2" />
        <view>通知</view>
      </view>
      <view class="flex flex-col px-4 rounded-[16rpx] bg-white">
        <view @tap="toNotice" class="h-12.5 flex items-center active:opacity-[0.7]">
          <view class="flex-1">系统通知</view>
          <view class="flex items-center">
            <image src="/static/images/icon-r.png" class="w-[34rpx] h-[34rpx]" />
          </view>
        </view>
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
