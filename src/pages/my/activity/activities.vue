<template>
  <view class="overflow-auto p-4 text-sm h-full space-y-4">
    <view class="flex items-center">
      <view class="flex-1">我参加的活动</view>
      <uni-data-select class="w-16" :clear="false" v-model="value" :localdata="range"
        @change="onChange"></uni-data-select>
    </view>

    <view class="space-y-3">
      <view class="flex text-center mb-2">
        <view class="w-1/4">日期</view>
        <view class="w-1/2">主题</view>
        <view class="w-1/4">状态</view>
      </view>

      <view v-for="(item, index) in list" :key="index" class="flex text-center">
        <view class="w-1/4">{{ formatDate(item?.eventTime) }}</view>
        <view class="w-1/2">{{ item?.theme }}</view>
        <view class="w-1/4">{{ item?.status == 0 ? '已报名' : item?.status == 1 ? '未参与' : '已参加' }}</view>
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

<style scoped></style>