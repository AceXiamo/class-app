<template>
  <view class="overflow-auto h-full text-sm">
    <!-- 轮播图 -->
    <view class="relative">
      <swiper
        v-if="banners.length > 0"
        class="h-[808rpx] w-full"
        circular
        :indicator-dots="false"
        :autoplay="false"
        :interval="3000"
        @change="onBannersSwiperChange"
      >
        <swiper-item v-for="(item, index) in banners" :key="index" class="h-[308rpx]">
          <image class="w-full h-full" :src="item.content" mode="scaleToFill" />>
        </swiper-item>
      </swiper>
      <view class="flex w-full absolute bottom-[150rpx]">
        <view class="flex-1 flex justify-center mx-4.5">
          <template v-for="(item, index) in banners" :key="`dot-${index}`">
            <view
              :class="[
                'w-1.5 h-1.5 mx-[7rpx] rounded-full bg-white',
                {
                  'opacity-50': activeBanners !== index,
                },
              ]"
            />
          </template>
        </view>
      </view>
    </view>

    <!-- 广告位 -->
    <view class="w-full h-[100rpx] relative" v-if="ads.length > 0">
      <swiper
        class="h-[200rpx] w-full absolute top-[-108rpx]"
        circular
        :indicator-dots="false"
        :autoplay="false"
        :interval="3000"
        @change="onAdsSwiperChange"
      >
        <swiper-item
          v-for="(item, index) in ads"
          :key="index"
          class="h-[308rpx] box-border px-[30rpx]"
        >
          <image class="w-full h-full rounded-[16rpx]" :src="item.content" mode="scaleToFill" />>
        </swiper-item>
      </swiper>
      <view class="flex w-full absolute bottom-[14rpx]">
        <view class="flex-1 flex justify-center mx-4.5">
          <template v-for="(item, index) in ads" :key="`dot-${index}`">
            <view
              :class="[
                'w-1.5 h-1.5 mx-[7rpx] rounded-full',
                {
                  'bg-[#92003F]': activeAds == index,
                  'bg-black opacity-20': activeAds !== index,
                },
              ]"
            />
          </template>
        </view>
      </view>
    </view>

    <!-- 关于我们 -->
    <view class="mt-[58rpx] px-4.5">
      <view class="relative w-full flex items-center">
        <view class="text-[40rpx] font-bold">关于我们</view>
        <view
          @tap="showMore"
          class="absolute text-sm text-repeat-99 right-0 flex items-center h-full"
          >了解更多
          <image src="/static/images/icon-r.png" mode="heightFix" class="h-[32rpx]" />
        </view>
      </view>

      <view class="mt-3 text-justify break-all text-repeat-33 text-sm leading-[44rpx]">
        {{ about }}
      </view>
    </view>

    <!-- 累计数据 -->
    <view class="mt-5 px-3">
      <view class="relative rounded-[16rpx] py-5 bg-white text-xs text-repeat-33">
        <view class="mt-1">
          <view class="pl-[22rpx] text-black text-xl font-bold flex items-center">
            <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
            本月
          </view>
          <view class="flex mt-[30rpx]">
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.monthRecommendNum)
              }}</view>
              <view class="mt-[10rpx]">给出引荐</view>
            </view>
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.monthSubmitMoneySum)
              }}</view>
              <view class="mt-[10rpx]">给出成交金额</view>
            </view>
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.monthHarvestMoneySum)
              }}</view>
              <view class="mt-[10rpx]">收到成交金额</view>
            </view>
          </view>
        </view>
        <view v-if="total?.sessionRecommendNum != null" class="mt-7">
          <view class="pl-[22rpx] text-black text-xl font-bold flex items-center">
            <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
            本届
          </view>
          <view class="flex mt-[30rpx]">
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.sessionRecommendNum)
              }}</view>
              <view class="mt-[10rpx]">给出引荐</view>
            </view>
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.sessionSubmitMoneySum)
              }}</view>
              <view class="mt-[10rpx]">给出成交金额</view>
            </view>
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.sessionHarvestMoneySum)
              }}</view>
              <view class="mt-[10rpx]">收到成交金额</view>
            </view>
          </view>
        </view>
        <view class="mt-7 mb-7">
          <view class="pl-[22rpx] text-black text-xl font-bold flex items-center">
            <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
            创会累计
          </view>
          <view class="flex mt-[30rpx]">
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.allRecommendNum)
              }}</view>
              <view class="mt-[10rpx]">给出引荐</view>
            </view>
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.allSubmitMoneySum)
              }}</view>
              <view class="mt-[10rpx]">给出成交金额</view>
            </view>
            <view class="flex-1 text-center">
              <view class="text-[30rpx] text-[#92003F] font-bold">{{
                formatNumber(total?.allHarvestMoneySum)
              }}</view>
              <view class="mt-[10rpx]">收到成交金额</view>
            </view>
          </view>
        </view>

        <view class="w-full flex justify-center text-xs text-repeat-33">
          <view @tap="showMoreData" class="flex items-center">
            更多数据
            <image src="/static/images/icon-r.png" mode="heightFix" class="h-[32rpx]" />
          </view>
        </view>
      </view>
    </view>

    <!-- 领导团队 -->
    <view class="mt-8 px-[30rpx]">
      <view class="relative w-full flex items-center mb-[30rpx]">
        <view class="text-[40rpx] font-bold">领导团队</view>
        <view
          @tap="showMoreTeam"
          class="absolute text-sm text-repeat-99 right-0 flex items-center h-full"
          >查看更多
          <image src="/static/images/icon-r.png" mode="heightFix" class="h-[32rpx]" />
        </view>
      </view>

      <view class="bg-white rounded-[16rpx] py-[30rpx] px-4 flex flex-col justify-center">
        <view class="grid grid-cols-3 gap-[26rpx]">
          <view
            v-for="(item, index) in team"
            :key="index"
            class="aspect-square relative rounded-[16rpx] overflow-hidden"
          >
            <image mode="aspectFill" class="w-full h-full" :src="item.avatar"> </image>
            <view
              class="absolute bottom-0 bg-[rgba(0,0,0,0.5)] w-full h-[49rpx] text-center text-white flex items-center justify-center text-xs"
            >
              {{ item.leadership_position }}</view
            >
          </view>
        </view>

        <!-- 申请加入 -->
        <view>
          <button
            class="font-medium text-white font-base bg-[#92003F] rounded-full w-[376rpx] mt-[66rpx] mb-[46rpx]"
            @tap="join"
          >
            申请加入
          </button>
        </view>
      </view>
    </view>
    <view class="w-full h-[34rpx]"></view>
  </view>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { getContent } from '@/api/app/news'
import * as homeApi from '@/api/app/home'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
import { formatNumber } from '@/utils/tools'

let memberStore = useMemberStore()

onShareAppMessage(() => {
  return {
    title: '立德俱乐部',
    path: '/pages/home/index',
  }
})

//轮播图
let banners: any = ref([])
const activeBanners = ref<number>(0)
const onBannersSwiperChange = (e: any) => {
  const { current } = e.detail
  activeBanners.value = current
}

//广告
let ads: any = ref([])
const activeAds = ref<number>(0)
const onAdsSwiperChange = (e: any) => {
  const { current } = e.detail
  activeAds.value = current
}

//关于我们
let about: any = ref('')

//领导团队
let team: any = ref([])

//总数据
let total: any = ref()

onLoad(async () => {
  const result1 = await homeApi.bannerList_1()
  banners.value = result1.data || []

  const result2 = await homeApi.adList_1()
  ads.value = result2.data || []

  const result3 = await homeApi.aboutShow_1()
  about.value = result3.data || ''

  const result4 = await homeApi.leaderList()
  team.value = result4.data || []

  const result5 = await homeApi.rudeDataBoard()
  total.value = result5.data
  // console.log(total.value)
})

//跳转了解更多
const showMore = () => {
  uni.navigateTo({ url: '/pages/home/about/index' })
}

//跳转累计数据
const showMoreData = () => {
  uni.navigateTo({ url: '/pages/home/data/index' })
}

//跳转历届领导团队
const showMoreTeam = () => {
  uni.navigateTo({ url: '/pages/home/team/index' })
}

//申请加入
const join = () => {
  // console.log('申请加入')
  if (!memberStore.profile) {
    uni.navigateTo({ url: '/pages/login/login' })
  } else {
    uni.navigateTo({ url: '/pages/my/info/info' })
  }
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
