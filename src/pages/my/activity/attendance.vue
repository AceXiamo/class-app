<template>
  <view class="overflow-auto p-4 text-sm h-full space-y-4">

    <view>我的出勤</view>

    <view class="border-solid border-[1rpx] border-repeat-79 p-4">
      我的全勤月数：{{ attend?.fullAttendanceMonth }}/{{ attend?.monthNum }}
    </view>

    <view>出勤月数</view>

    <view class="space-y-3">
      <view class="flex text-center mb-2">
        <view class="flex-1">月份</view>
        <view class="flex-1">出席</view>
        <view class="flex-1">替代出席</view>
        <view class="flex-1">迟到</view>
        <view class="flex-1">早退</view>
        <view class="flex-1">缺席</view>
      </view>

      <view v-for="(item, index) in attend?.myAttendanceVOList" :key="index" class="flex text-center">
        <view class="flex-1">{{ item?.month }}月</view>
        <view class="flex-1">{{ item?.present || 0 }}</view>
        <view class="flex-1">{{ item?.represent || 0 }}</view>
        <view class="flex-1">{{ item?.lateArrival || 0 }}</view>
        <view class="flex-1">{{ item?.earlyDeparture || 0 }}</view>
        <view class="flex-1">{{ item?.absent || 0 }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
</script>

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
    list.value.sort((a: { year: number; month: number }, b: { year: number; month: number }): number => {
      if (a.year !== b.year) {
        return b.year - a.year;
      } else {
        return b.month - a.month;
      }
    })
  }
})

</script>

<style scoped></style>