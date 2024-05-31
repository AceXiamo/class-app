<template>
  <view class="overflow-y-auto overflow-x-hidden text-sm">
    <!-- 头像 -->
    <view class="w-full h-[360rpx]">
      <image mode="aspectFill" class="w-full h-full" :src="info?.avatar" @click="previewImage">
      </image>
    </view>

    <!-- 基本信息 -->
    <view class="px-[30rpx] pt-4.5 pb-2 flex flex-col bg-white">
      <view class="flex font-medium items-center h-[50rpx]">
        <view class="flex-1 text-xl">{{ info?.name }}</view>
        <view
          v-if="info?.leadershio_position"
          style="background: linear-gradient(135deg, #f5cd71 0%, #cf9219 100%)"
          class="flex items-center h-[50rpx] px-[28rpx] rounded-full text-white text-sm font-medium"
        >
          {{ info?.leadershio_position }}
        </view>
      </view>
      <view class="mt-2 h-5.5 flex items-center text-[26rpx] text-repeat-33"
        >行业：{{ info?.industry }}</view
      >
      <view class="h-5.5 flex items-center text-[26rpx] text-repeat-33"
        >入会时间：{{ dateFormatYearAndMonth(info?.createTime.toString()) }}</view
      >
    </view>

    <!-- 标签 -->
    <view
      v-if="info?.tags && info?.tags.length > 0"
      class="border-0 border-t-[1rpx] border-solid border-[#F8F8F8] pl-[28rpx] bg-white"
    >
      <!-- 折叠组件 -->
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
    </view>

    <view
      class="text-sm px-[30rpx] pt-[28rpx] pb-6 flex flex-col border-0 border-t-[1rpx] border-solid border-[#F8F8F8] bg-white space-y-2.75"
    >
      <view class="flex items-center font-medium">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        公司：<text class="font-normal text-repeat-66">{{ info?.company }}</text>
      </view>
      <view class="flex items-center font-medium">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        职位：<text class="font-normal text-repeat-66">{{ info?.position }}</text>
      </view>
      <view class="flex items-center font-medium">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        公司主营：
      </view>
      <view class="flex items-center text-repeat-66 break-all text-justify ml-[18rpx]"
        >{{ info?.bussiness }}
      </view>
      <view class="flex items-center font-medium">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        公司优势：
      </view>
      <view class="flex items-center text-repeat-66 break-all text-justify ml-[18rpx]">
        {{ info?.advantage }}
      </view>
      <view
        v-if="memberStore?.profile && memberStore?.profile?.userInfo?.status === 4"
        class="flex items-center font-medium"
      >
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        公司地址：
      </view>
      <view
        v-if="memberStore?.profile && memberStore?.profile?.userInfo?.status === 4"
        class="font-normal flex text-repeat-66 break-all text-justify ml-[18rpx]"
      >
        <view class="flex-1 break-all">{{ info?.companyAddress }}</view>
        <image
          @tap="navigation"
          mode="aspectFill"
          class="w-4 h-4 ml-4 mr-[38rpx]"
          src="@/static/images/navigation.png"
        >
        </image>
      </view>
    </view>

    <view
      class="font-medium text-sm space-y-2.75 px-[30rpx] pt-4.5 pb-[50rpx] flex flex-col border-solid border-[#EDEDED] border-0 border-t-[1rpx]"
    >
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        需要引荐资源：
      </view>
      <view class="font-normal flex text-repeat-66 break-all text-justify ml-[18rpx]">
        {{ info?.resourcesNeed }}</view
      >
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        能提供的资源：
      </view>
      <view class="font-normal flex text-repeat-66 break-all text-justify ml-[18rpx]">{{
        info?.resourcesProvide
      }}</view>
    </view>

    <view
      v-if="memberStore?.profile && memberStore?.profile?.userInfo?.status == 4"
      class="px-[30rpx] py-6 text-sm flex border-solid border-[#EDEDED] border-0 border-t-[1rpx] text-white gap-2.5"
    >
      <view
        class="flex-1 text-center rounded-[16rpx] py-4"
        style="background: linear-gradient(135deg, #d41869 0%, #92003f 100%)"
      >
        <view>给出引荐数</view>
        <view class="mt-1.25 text-xl font-bold">{{ info?.recommendNumProvide || 0 }}</view>
      </view>
      <view
        class="flex-1 text-center rounded-[16rpx] py-4"
        style="background: linear-gradient(135deg, #d41869 0%, #92003f 100%)"
      >
        <view>给出引荐成交金额</view>
        <view class="mt-1.25 text-xl font-bold"
          >￥{{ formatNumber(info?.recommendMoneyProvide) }}</view
        >
      </view>
    </view>

    <view
      class="font-medium text-sm px-[30rpx] pt-5 pb-5.5 border-solid border-[#EDEDED] border-0 border-t-[1rpx] space-y-2.75"
    >
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        累计邀约嘉宾数量：{{ info?.inviteNum || 0 }}
      </view>
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        走访会员企业次数：{{ info?.visitNum || 0 }}
      </view>
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        入会至今全勤月数：{{ info?.fullAttendanceMonth || 0 }}/{{ info?.monthNum || 0 }}
      </view>
    </view>

    <view
      class="font-medium px-[30rpx] py-5 border-solid border-[#EDEDED] border-0 border-t-[1rpx]"
    >
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        介绍人：{{ info?.recommenderName }}
      </view>
    </view>

    <view
      class="font-medium text-sm px-[30rpx] pt-5 pb-5.5 border-solid border-[#EDEDED] border-0 border-t-[1rpx] space-y-2.75"
    >
      <view class="flex">
        <view class="flex-1 flex items-center">
          <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
          性别：<text class="font-normal text-repeat-66">{{ info?.sex == 0 ? '男' : '女' }}</text>
        </view>
        <view class="flex-1 flex items-center">
          <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
          家乡：<text class="font-normal text-repeat-66">{{ info?.homeplace }}</text>
        </view>
      </view>
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        学校/年级/专业：<text class="font-normal text-repeat-66">{{ info?.college }}</text>
      </view>
      <view class="flex">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75 mt-1.25"></view>
        <view class="break-all text-justify w-full"
          >爱好：<text class="font-normal text-repeat-66">{{ info?.hobby }} </text>
        </view>
      </view>
    </view>

    <view
      class="font-medium text-sm px-[30rpx] pt-5 pb-[50rpx] border-solid border-[#EDEDED] border-0 border-t-[1rpx] space-y-2.75 bg-white"
    >
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>
        联系电话：{{ info?.mobile }}
      </view>
      <view class="flex items-center">
        <view class="w-0.5 h-2.75 bg-[#92003F] mr-1.75"></view>微信二维码：
      </view>
      <view class="flex justify-center">
        <image class="w-[308rpx] h-[308rpx]" :src="info?.wechatQrCode"></image>
      </view>
    </view>

    <view
      class="pt-[68rpx] pb-[98rpx] border-solid border-[#EDEDED] border-0 border-t-[1rpx] flex justify-center bg-white"
    >
      <view
        class="font-medium rounded-full w-[376rpx] h-11 flex items-center justify-center text-base text-white bg-[#92003F] active:opacity-70"
      >
        获取联系方式
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { getDetailInfo } from '@/api/app/userinfo'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
import { dateFormatYearAndMonth } from '@/utils/tools'
import collapse from '@/components/collapse/index.vue'
import { formatNumber } from '@/utils/tools'

let memberStore = useMemberStore()

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

// const navigation = () => {
//   uni.openLocation({
//     name: '深圳市南山区华润置地大厦E座1609',
//     address: '深圳市南山区华润置地大厦E座1609'
//   });
// }

//头像预览
const previewImage = () => {
  uni.previewImage({
    urls: info.value?.avatar, // 预览的图片路径数组，这里只预览一张图片，所以数组只有一个元素
  })
}

let info: any = ref()
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
})

const onChange = () => {}
</script>

<style scoped></style>
