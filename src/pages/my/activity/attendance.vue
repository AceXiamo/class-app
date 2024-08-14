<template>
  <view class="overflow-auto p-4 text-sm h-full space-y-4">
    <view class="rounded-[16rpx] bg-white w-full">
      <view class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative">
        <view class="w-0.75 h-[28rpx] bg-[#92003F] mr-2"></view>
        <view class="text-base font-bold">我的出勤</view>
      </view>

      <view class="flex flex-col items-center justify-center p-[50rpx]">
        <view>我的全勤月数</view>
        <view class="text-[40rpx] text-[#92003F] font-bold mt-1">{{ attend?.fullAttendanceMonth || 0 }}/{{
          attend?.monthNum || 0 }}
        </view>
      </view>
    </view>

    <view class="rounded-[16rpx] bg-white w-full">
      <view class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative">
        <view class="w-0.75 h-[28rpx] bg-[#92003F] mr-2"></view>
        <view class="text-base font-bold">出勤月数</view>
      </view>

      <view>
        <view class="flex text-center mt-[30rpx] mb-[14rpx] leading-[44rpx] font-bold">
          <view class="flex-1">月份</view>
          <view class="flex-1">出席</view>
          <view class="flex-1">替代出席</view>
          <view class="flex-1">迟到</view>
          <view class="flex-1">早退</view>
          <view class="flex-1">缺席</view>
        </view>
        <block v-if="attend?.myAttendanceVOList.length">
          <view v-for="(item, index) in attend?.myAttendanceVOList" :key="index" :class="[
            'flex text-center text-[#333] leading-[44rpx] pt-[26rpx] pb-[26rpx]',
            {
              'border-solid': index !== attend?.myAttendanceVOList.length - 1,
              'border-b-[2rpx]': index !== attend?.myAttendanceVOList.length - 1,
              'border-[#F8F8F8]': index !== attend?.myAttendanceVOList.length - 1,
            },
          ]">
            <view class="flex-1">{{ item?.month }}月</view>
            <view class="flex-1">{{ item?.present || 0 }}</view>
            <view class="flex-1">{{ item?.represent || 0 }}</view>
            <view class="flex-1">{{ item?.lateArrival || 0 }}</view>
            <view class="flex-1">{{ item?.earlyDeparture || 0 }}</view>
            <view class="flex-1">{{ item?.absent || 0 }}</view>
          </view>
        </block>
        <view v-else class="text-center text-[#999] text-xs py-2">暂无信息</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { getAttendance } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

let attend: any = ref()
let list: any = ref([])
onLoad(async () => {
  const { data } = await getAttendance()
  attend.value = data
  list.value = data.myAttendanceVOList || []
  if (list.value.length > 0) {
    list.value.sort(
      (a: { year: number; month: number }, b: { year: number; month: number }): number => {
        if (a.year !== b.year) {
          return b.year - a.year
        } else {
          return b.month - a.month
        }
      },
    )
  }
})
</script>

<style scoped></style>
