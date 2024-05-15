<template>
  <view class="overflow-auto h-full p-4 text-sm space-y-4">
    <view>我的嘉宾</view>

    <view class="relative border-solid border-[1rpx] border-repeat-79 p-2 space-y-2">
      <view>介绍会员数：{{ guest.memberNum }}</view>
      <view>嘉宾数：{{ guest.guestNum }}</view>
      <view>准嘉宾数：{{ guest.boundGuestNum }}</view>

      <uni-data-select class="absolute right-2 top-2  w-16" :clear="false" v-model="value" :localdata="range"
        @change="onChange"></uni-data-select>
    </view>
    <view>嘉宾列表</view>

    <view>
      <view class="flex text-center mb-3">
        <view class="flex-1">注册日期</view>
        <view class="flex-1">名字</view>
        <view class="flex-1">行业</view>
        <view class="flex-1">参会次数</view>
        <view class="flex-1">身份</view>
      </view>

      <view class="space-y-3">
        <view v-for="(item, index) in guest.boundGuestNum" :key="index" class="flex text-center">
          <view class="flex-1">{{ item.createTime }}</view>
          <view class="flex-1">{{ item.name }}</view>
          <view class="flex-1">{{ item.industry }}</view>
          <view class="flex-1">{{ item.attendNum }}</view>
          <view class="flex-1">{{ item.status == 0 ? '游客' : item.status == 1 ? '待验证' : item.status == 2 ? '准嘉宾' :
        item.status ==
          3 ? '嘉宾' : item.status == 4 ? '会员' : item.status == 5 ? '顾问团' : '历史会员' }}</view>
        </view>
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

<style scoped></style>