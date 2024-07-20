<template>
  <view class="overflow-auto p-4 text-sm h-full space-y-4">
    <view class="rounded-[16rpx] bg-white w-full">
      <view class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative">
        <view class="w-0.75 h-[28rpx] bg-[#92003F] mr-2"></view>
        <view class="text-base">我参加的活动</view>
        <view class="w-[122rpx] h-[42rpx] rounded-full absolute right-[30rpx]">
          <uni-data-select class="w-16" :clear="false" v-model="value" :localdata="range"
            @change="onChange"></uni-data-select>
        </view>
      </view>

      <view class="space-y-3">
        <view class="flex text-center mt-[30rpx] mb-[14rpx] leading-[44rpx]">
          <view class="w-1/4">日期</view>
          <view class="w-1/2">主题</view>
          <view class="w-1/4">状态</view>
        </view>

        <view v-for="(item, index) in list" :key="index" :class="['flex text-center text-[#333] leading-[44rpx] pt-[26rpx] pb-[26rpx]', {
          'border-solid': index !== list.length - 1,
          'border-b-[2rpx]': index !== list.length - 1,
          'border-[#F8F8F8]': index !== list.length - 1
        }]">
          <view class="w-1/4">{{ formatDate(item?.eventTime) }}</view>
          <view class="w-1/2">{{ item?.theme }}</view>
          <view class="w-1/4">{{ item?.status == 0 ? '已报名' : item?.status == 1 ? '未参与' : '已参加' }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { getMyEventList } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app';
import { formatDate } from '@/utils/tools';

let list: any = ref([])

onLoad(() => {
  getMyEventList({ queryType: value.value }).then(res => {
    list.value = res.data
  });
})

let value = ref(0);
let range = ref([
  { value: 0, text: '本周' },
  { value: 1, text: '本月' },
  { value: 2, text: '本届' },
  { value: 3, text: '累计' },
]);
const onChange = (e: any) => {
  // console.log('change事件:', e);
  value.value = e;
  getMyEventList({ queryType: value.value }).then(res => {
    list.value = res.data
  });
}

</script>

<style lang="scss" scoped>
::v-deep .uni-select {
  border-radius: 9999rpx !important;
  background-color: #fff5f9 !important;
  height: 44rpx !important;
  font-size: 24rpx !important;
  display: flex !important;
  align-items: center !important;
  border: 0 !important;
}

::v-deep .uni-select__input-text {
  color: #92003f !important;
}

::v-deep .uni-icons {
  color: #92003f !important;
}
</style>