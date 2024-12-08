<template>
  <view class="overflow-auto h-full text-sm bg-white pb-[200rpx]">
    <view class="relative">
      <swiper
        v-if="banners.length > 0"
        class="h-[750rpx] w-full"
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
    <image :src="aboutUsCover" mode="widthFix" class="w-full mt-[50rpx]" />
    <view class="mt-[80rpx]">
      <button
        class="font-medium text-white font-base bg-[#92003F] rounded-full w-[376rpx] mt-5 mb-[46rpx]"
        @tap="join"
      >
        加入商会
      </button>
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

const aboutUsCover = ref('')

onLoad(async () => {
  homeApi.bannerList_1().then((result1) => {
    banners.value = result1.data || []
  })

  homeApi.adList_1().then((result2) => {
    ads.value = result2.data || []
  })

  homeApi.aboutShow_1().then((result3) => {
    about.value = result3.data || ''
  })

  homeApi.leaderList().then((result4) => {
    team.value = result4.data || []
  })

  homeApi.rudeDataBoard().then((result5) => {
    total.value = result5.data
    // console.log(total.value)
  })

  homeApi.aboutUsCover().then((result6) => {
    aboutUsCover.value = (result6.data as string) || ''
  })
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

//跳转会员详情页
const goDetail = (id: any) => {
  uni.navigateTo({ url: '/pages/member/detail/index?id=' + id })
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
