<template>
  <view class="overflow-y-auto overflow-x-hidden text-sm">
    <!-- 头像 -->
    <view class="w-full aspect-square">
      <image mode="widthFix" class="w-full h-full" :src="info?.avatar" @click="previewImage">
      </image>
    </view>

    <!-- 基本信息 -->
    <view class="px-[30rpx] pt-4.5 pb-2 flex flex-col bg-white">
      <view class="flex font-bold items-center h-[50rpx]">
        <view class="flex-1 text-xl">{{ info?.name }}</view>
        <view
          style="background: linear-gradient(135deg, #f5cd71 0%, #cf9219 100%)"
          class="flex items-center h-[50rpx] px-[28rpx] rounded-full text-white text-sm font-bold"
        >
          {{ tabs.find((item: any) => item.key == info?.status)?.title }}
        </view>
      </view>
      <view class="flex justify-end text-[#666] text-sm mt-[10rpx] pr-[20rpx]">
        {{ tabs.find((item: any) => item.key == info?.position)?.title }}
      </view>
    </view>

    <!-- 标签 -->
    <!-- <view
      v-if="info?.tags && info?.tags.length > 0"
      class="border-0 border-t-[1rpx] border-solid border-[#F8F8F8] pl-[28rpx] bg-white"
    >
      <collapse
        :width="600"
        :px="16"
        :my="20"
        :height="44"
        :textColor="'#FF7A33'"
        :borderColor="'rgba(0,0,0,0)'"
        :borderRadius="9999"
        :borderWidth="1"
        :fontSize="24"
        :marginRight="18"
        :dataSource="info?.tags"
        :bgColor="'#FFEFE1'"
      />
    </view> -->

    <view
      class="text-sm px-[30rpx] pt-[28rpx] pb-6 flex flex-col border-0 border-t-[1rpx] border-solid border-[#F8F8F8] bg-white space-y-2.75"
    >
      <view class="flex flex-col gap-[20rpx]" v-if="info?.college">
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

      <view class="flex flex-col gap-[20rpx]" v-if="info?.bussiness">
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

      <view class="flex flex-col gap-[20rpx]" v-if="info?.company">
        <view class="flex items-center font-bold">
          <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
          企业介绍：
        </view>
        <view class="flex flex-col gap-[10rpx]">
          <text class="text-[#666]">
            {{ info?.company }}
          </text>
        </view>
      </view>

      <view class="flex flex-col gap-[20rpx]" v-if="info?.companyAddress">
        <view class="flex items-center font-bold">
          <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
          个人介绍：
        </view>
        <view class="flex flex-col gap-[10rpx]">
          <text class="text-[#666]">
            {{ info?.companyAddress }}
          </text>
        </view>
      </view>
    </view>

    <view
      class="font-bold text-sm px-[30rpx] pt-5 pb-[50rpx] border-solid border-[#EDEDED] border-0 border-t-[1rpx] space-y-2.75 bg-white"
      v-if="info?.mobile"
    >
      <view class="flex items-center relative">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        联系电话：{{ info?.mobile }}
        <image
          @tap="call"
          src="@/static/images/call.png"
          mode="aspectFill"
          class="w-4 h-4 absolute right-3"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { getDetailInfo } from '@/api/app/userinfo'
import { qrCodeShow_1 } from '@/api/app/home'
import { ref, toRefs } from 'vue'
import { useMemberStore } from '@/stores'
import { dateFormatYearAndMonth } from '@/utils/tools'
import collapse from '@/components/collapse/index.vue'
import { formatNumber } from '@/utils/tools'

const { profile } = toRefs(useMemberStore())
const popup = ref()

const call = () => {
  uni.makePhoneCall({
    phoneNumber: info.value?.mobile,
  })
}

const get = async () => {
  if (!profile.value) {
    uni.navigateTo({ url: '/pages/login/login' })
    return
  } else if (profile?.value.userInfo.status == 2) {
    uni.navigateTo({ url: '/pages/my/info/info' })
    return
  } else if (profile?.value.userInfo.status == 3) {
    // _this?.refs.popup.open()
    popup.value.open()
  }
}

let memberStore = useMemberStore()

let tabs = ref([
  { key: 3, title: '秘书处' },
  { key: 4, title: '理事' },
  { key: 5, title: '副会长' },
  { key: 6, title: '常务副会长' },
  { key: 7, title: '监事长' },
  { key: 8, title: '执行会长' },
  { key: 9, title: '名誉会长' },
  { key: 10, title: '会长' },
])

// const QQMapWX = require('../../../utils/map/qqmap-wx-jssdk.min'),
//   qqmapsdk = new QQMapWX({
//     key: 'XYDBZ-YFX2U-MV5VJ-2WYE5-ECQMZ-FKFNI' // 必填
//   });
// // 地址转坐标
// const getGeocoder = () => {
//   var that = this
//   qqmapsdk.geocoder({
//     address: '深圳市南山区华润置地大厦E座1609',  // 地址参数
//     success: function (res: any) {
//       console.log(res)
//       // var latitude = result.location.lng  // 经度
//       // var longitude = result.location.lat  // 经度
//     },
//     fail: function (res: any) {
//       console.log(res, '这是错误信息')
//     },
//   })
// }

const navigation = () => {
  if (info.value.lat && info.value.lng && info.value.companyAddress) {
    uni.openLocation({
      address: info.value.companyAddress,
      latitude: info.value.lat,
      longitude: info.value.lng,
      fail(res) {
        console.log(res)
      },
    })
  }
}

//头像预览
const previewImage = () => {
  uni.previewImage({
    urls: info.value?.avatar, // 预览的图片路径数组，这里只预览一张图片，所以数组只有一个元素
  })
}

let info: any = ref()
let kefuQrCode: any = ref()
onLoad((options: any) => {
  // getGeocoder()
  console.log(options.id)
  getDetailInfo({ userId: options.id - 0 }).then((res) => {
    console.log(res.data)
    info.value = res.data
    uni.setNavigationBarTitle({
      title: info.value?.name,
    })
  })
  if (profile && profile.value?.userInfo?.status == 3) {
    qrCodeShow_1().then((res) => {
      kefuQrCode.value = res.data
    })
  }
})

onShareAppMessage(() => {
  return {
    title: info.value?.name,
    imageUrl: info.value?.avatar,
    path: 'pages/member/detail/index?id=' + info.value?.userId,
  }
})

const onChange = () => {}
</script>

<style scoped></style>
