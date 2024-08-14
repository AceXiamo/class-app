<template>
  <view class="overflow-auto h-full p-4 text-sm space-y-4">
    <view class="rounded-[16rpx] bg-white w-full">
      <view class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative">
        <view class="w-0.75 h-[28rpx] bg-[#92003F] mr-2"></view>
        <view class="text-base font-bold">我的嘉宾</view>
        <view class="w-[108rpx] h-[42rpx] rounded-full absolute right-[30rpx]">
          <uni-data-select class="w-16" :clear="false" v-model="value" :localdata="range"
            @change="onChange"></uni-data-select>
        </view>
      </view>

      <view class="flex item-center pt-6 pb-6">
        <view class="flex-1 text-center">
          <view>介绍会员数</view>
          <view class="text-[40rpx] text-[#92003F] font-bold mt-1">{{ guest.memberNum }}</view>
        </view>
        <view class="flex-1 text-center">
          <view>嘉宾数</view>
          <view class="text-[40rpx] text-[#92003F] font-bold mt-1">{{ guest.guestNum }}</view>
        </view>
        <view class="flex-1 text-center">
          <view>准嘉宾数</view>
          <view class="text-[40rpx] text-[#92003F] font-bold mt-1">{{ guest.boundGuestNum }}</view>
        </view>
      </view>
    </view>

    <view class="rounded-[16rpx] bg-white w-full">
      <view class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative">
        <view class="w-0.75 h-[28rpx] bg-[#92003F] mr-2"></view>
        <view class="text-base font-bold">嘉宾列表</view>
      </view>

      <view>
        <view class="flex text-center mt-[30rpx] mb-[14rpx] leading-[44rpx] font-bold">
          <view class="flex-1">注册日期</view>
          <view class="flex-1">名字</view>
          <view class="flex-1">行业</view>
          <view class="flex-1">参会次数</view>
          <view class="flex-1">身份</view>
        </view>
        <block v-if="guest.boundGuestNum.length">
          <view v-for="(item, index) in guest.boundGuestNum" :key="index" :class="['flex text-center text-[#333] leading-[44rpx] pt-[26rpx] pb-[26rpx]', {
            'border-solid': index !== guest.boundGuestNum.length - 1,
            'border-b-[2rpx]': index !== guest.boundGuestNum.length - 1,
            'border-[#F8F8F8]': index !== guest.boundGuestNum.length - 1
          }]">
            <view class="flex-1">{{ item.createTime }}</view>
            <view class="flex-1">{{ item.name }}</view>
            <view class="flex-1">{{ item.industry }}</view>
            <view class="flex-1">{{ item.attendNum }}</view>
            <view class="flex-1">{{ item.status == 0 ? '游客' : item.status == 1 ? '待验证' : item.status == 2 ? '准嘉宾' :
              item.status ==
                3 ? '嘉宾' : item.status == 4 ? '会员' : item.status == 5 ? '顾问团' : '历史会员' }}</view>
          </view>
        </block>
        <view v-else class="text-center text-[#999] text-xs py-2">暂无信息</view>
      </view>
    </view>

  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { getGuest } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app';

let guest: any = ref({})

let value = ref(0);
let range = ref([
  { value: 0, text: '本周' },
  { value: 1, text: '本月' },
  { value: 2, text: '本届' },
  { value: 3, text: '累计' },
]);

onLoad(async () => {
  const { data } = await getGuest({ queryType: value.value });
  guest.value = data || {};
  // console.log(guest.value);
})

const onChange = async (e: any) => {
  // console.log('change事件:', e);
  const { data } = await getGuest({ queryType: e });
  guest.value = data || {};
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
  text-align: right !important;
}

::v-deep .uni-icons {
  color: #92003f !important;
  margin: 0 6rpx 0 8rpx !important;
}
</style>