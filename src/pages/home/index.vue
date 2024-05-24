<template>
  <view class="overflow-auto text-sm">
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
    <view class="w-full h-[100rpx] relative">
      <swiper
        v-if="ads.length > 0"
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
          <image
            class="w-full h-full bg-red-500 rounded-[16rpx]"
            :src="item.content"
            mode="scaleToFill"
          />>
        </swiper-item>
      </swiper>
      <view class="flex w-full absolute bottom-[14rpx]">
        <view class="flex-1 flex justify-center mx-4.5">
          <template v-for="(item, index) in ads" :key="`dot-${index}`">
            <view
              :class="[
                'w-1.5 h-1.5 mx-[7rpx] rounded-full bg-white',
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
      <view class="relative w-full">
        <text class="font-bold text-[40rpx] font-medium">关于我们</text>
        <text
          @tap="showMore"
          class="absolute text-ss right-0 border-repeat-79 border-solid border-[1rpx] w-[136rpx] text-center py-1"
          >了解更多..</text
        >
      </view>

      <view class="mt-3 text-justify break-all text-repeat-33 text-sm leading-[44rpx]">
        {{ about }}
      </view>
    </view>

    <!-- 累计数据 -->
    <view class="mt-5 px-3">
      <view class="relative rounded-[16rpx] p-4 bg-white">
        <view class="mt-4">
          <view>本月</view>
          <view class="flex">
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.monthRecommendNum }}</view>
              <view class="mt-2">给出引荐</view>
            </view>
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.monthSubmitMoneySum }}</view>
              <view class="mt-2">给出成交金额</view>
            </view>
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.monthHarvestMoneySum }}</view>
              <view class="mt-2">收到成交金额</view>
            </view>
          </view>
        </view>
        <view class="mt-4">
          <view>本届</view>
          <view class="flex">
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.sessionRecommendNum }}</view>
              <view class="mt-2">给出引荐</view>
            </view>
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.sessionSubmitMoneySum }}</view>
              <view class="mt-2">给出成交金额</view>
            </view>
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.sessionHarvestMoneySum }}</view>
              <view class="mt-2">收到成交金额</view>
            </view>
          </view>
        </view>
        <view class="mt-4 mb-16">
          <view>创会累计</view>
          <view class="flex">
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.allRecommendNum }}</view>
              <view class="mt-2">给出引荐</view>
            </view>
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.allSubmitMoneySum }}</view>
              <view class="mt-2">给出成交金额</view>
            </view>
            <view class="flex-1 text-center">
              <view class="mt-2">{{ total?.allHarvestMoneySum }}</view>
              <view class="mt-2">收到成交金额</view>
            </view>
          </view>
        </view>
        <text
          @tap="showMoreData"
          class="absolute text-ss right-4 bottom-8 border-repeat-79 border-solid border-[1rpx] w-[136rpx] text-center py-1"
          >更多数据</text
        >
      </view>
    </view>

    <!-- 领导团队 -->
    <view class="mt-5 px-4.5">
      <view class="relative w-full text-base">
        <text class="font-bold">领导团队</text>
        <text @tap="showMoreTeam" class="absolute right-0">查看更多>></text>
      </view>

      <view v-if="team2.length > 0" class="mt-5 grid grid-cols-4 gap-[24rpx]">
        <view
          v-for="(item, index) in team2"
          :key="index"
          class="border-repeat-79 border-solid border-[1rpx] aspect-square"
        >
          <image mode="aspectFit" class="w-full h-full" :src="item.mainImg"> </image>
          <view class="text-center">{{ item.leadership_position }}</view>
        </view>
      </view>

      <view v-if="team1.length > 0" class="mt-3 flex justify-center">
        <view class="w-[153rpx] border-repeat-79 border-solid border-[1rpx] aspect-square">
          <image mode="aspectFit" class="w-full h-full" :src="team1[0].mainImg"> </image>
          <view class="text-center">{{ team1[0].leadership_position }}</view>
        </view>
      </view>
    </view>

    <!-- 申请加入 -->
    <button
      class="font-bold rounded-full w-[510rpx] border-repeat-79 border-solid border-[1rpx] mt-4 mb-10"
      @tap="join"
    >
      申请加入
    </button>
  </view>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { getContent } from '@/api/app/news'
import * as homeApi from '@/api/app/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'

let memberStore = useMemberStore()

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
let team1: any = ref([])
let team2: any = ref([])

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

  team.value.forEach((item: any) => {
    if (item.position == '创会导师') {
      team1.value.push(item)
    } else {
      team2.value.push(item)
    }
  })

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
