<template>
  <view class="overflow-y-auto overflow-x-hidden text-sm">
    <view class="w-full h-[360rpx]">
      <image mode="aspectFit" class="w-full h-full border-solid border-repeat-79 border-[1rpx]" :src="info?.avatar">
      </image>
    </view>
    <view class="p-4 flex flex-col justify-between">
      <view class=" font-bold flex">
        <view class="flex-1 text-xl">{{ info?.name }}</view>
        <view v-if="info?.leadershio_position"
          class="flex items-center py-0.5 px-2 border-solid border-repeat-79 border-[1rpx] rounded-md">
          {{ info?.leadershio_position }}
        </view>
      </view>
      <view class="my-2">行业：{{ info?.industry }}</view>
      <view>入会时间：{{ dateFormatYearAndMonth(info?.createTime.toString()) }}</view>
    </view>

    <view v-if="info?.tags && info?.tags.length > 0"
      class="pl-3 py-1 border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <uni-collapse ref="collapse" @change="onChange">
        <uni-collapse-item titleBorder="none" :border="false" :open="false">
          <template v-slot:title>
            <view class=" flex">
              <view v-for="(item, index) in info?.tags" :key="index"
                class="text-xs border-solid border-repeat-79 border-[1rpx] rounded-md m-1 px-1 py-0.5 w-22.5 text-center">
                {{ item }}
              </view>
            </view>
          </template>
          <view class=" flex flex-wrap" style="width: calc(100% - 40rpx)">
            <view v-for="(item, index) in info?.tags" :key="index">
              <view v-if="index >= 3"
                class="text-xs border-solid border-repeat-79 border-[1rpx] rounded-md m-1 px-1 py-0.5 w-22.5 text-center">
                {{ item }}</view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <view class="font-bold p-4 flex flex-col border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <view class="mb-3">公司：<text class="font-normal">{{ info?.company }}</text></view>
      <view class="mb-3">职位：<text class="font-normal">{{ info?.position }}</text></view>
      <view class="mb-3">公司主营：</view>
      <view class="mb-3 font-normal">{{ info?.bussiness }}</view>
      <view class="mb-3">公司优势：</view>
      <view class="mb-3 font-normal break-all text-justify">
        {{ info?.advantage }}</view>
      <view class="mb-3">{{ memberStore?.profile && memberStore?.profile?.userInfo?.status == 4 ? '公司地址：' : '' }}</view>
      <view v-if="memberStore?.profile && memberStore?.profile?.userInfo?.status == 4" class="font-normal flex">
        <view class="flex-1 break-all">{{ memberStore?.profile && memberStore?.profile?.userInfo?.status == 4 ?
        info?.companyAddress : '' }}</view>
        <image @tap="navigation" mode="aspectFill" class="w-4 h-4 ml-4" src="@/static/images/navigation.png">
        </image>
      </view>
    </view>

    <view class="font-bold p-4 flex flex-col border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <view class="mb-3">需要引荐资源：</view>
      <view class="mb-3 font-normal break-all text-justify">
        {{ info?.resourcesNeed }}</view>
      <view class="mb-3">能提供的资源：</view>
      <view class="mb-3 font-normal break-all text-justify">{{ info?.resourcesProvide }}</view>
    </view>

    <view v-if="memberStore?.profile && memberStore?.profile?.userInfo?.status == 4"
      class="font-bold p-4 flex border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <view class="flex-1 text-center">
        <view>给出引荐数</view>
        <view class="mt-2">{{ info?.recommendNumProvide }}</view>
      </view>
      <view class="flex-1 text-center">
        <view>给出引成交金额</view>
        <view class="mt-2">{{ info?.recommendMoneyProvide }}</view>
      </view>
    </view>

    <view class="font-bold p-4 border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <view class="mb-3">累计邀约嘉宾数量：{{ info?.inviteNum }}</view>
      <view class="mb-3">走访会员企业次数：{{ info?.visitNum }}</view>
      <view>入会至今全勤月数：{{ info?.fullAttendanceMonth }}/{{ info?.monthNum }}</view>
    </view>

    <view class="font-bold p-4 border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <view>介绍人：{{ info?.recommenderId }}</view>
    </view>

    <view class="font-bold p-4 border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <view class="mb-3 flex">
        <view class="flex-1">性别：<text class="font-normal">{{ info?.sex == 0 ? '男' : '女' }}</text></view>
        <view class="flex-1">家乡：<text class="font-normal">{{ info?.homeplace }}</text></view>
      </view>
      <view class="mb-3 break-all text-justify">学校/年级/专业：<text class="font-normal">{{ info?.college }}</text></view>
      <view class="break-all text-justify">爱好：<text class="font-normal">{{ info?.hobby }}</text></view>
    </view>

    <view class="font-bold p-4 border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <view class="mb-3">微信二维码：</view>
      <view class="mb-3 flex justify-center">
        <image class="w-40 h-40 border-solid border-repeat-79 border-[1rpx]" :src="info?.wechatQrCode"></image>
      </view>
      <view class="">联系电话：{{ info?.mobile }}</view>
    </view>

    <view class="font-bold p-4 border-solid border-repeat-79 border-0 border-t-[1rpx]">
      <button class="font-bold rounded-full w-[510rpx] border-repeat-79 border-solid border-[1rpx] mt-4 mb-10">
        获取联系方式
      </button>
    </view>
  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { getDetailInfo } from '@/api/app/userinfo'
import { ref } from 'vue';
import { useMemberStore } from '@/stores'
import { dateFormatYearAndMonth } from '@/utils/tools';

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

let info: any = ref()
onLoad((options: any) => {
  // getGeocoder()
  console.log(options.id)
  getDetailInfo({ userId: options.id - 0 }).then(res => {
    console.log(res.data)
    info.value = res.data
  })
})

const onChange = () => {
}
</script>

<style scoped></style>