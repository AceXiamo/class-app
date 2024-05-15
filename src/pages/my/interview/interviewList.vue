<template>
  <view class="overflow-auto p-4 text-sm h-full space-y-4">

    <view>我的走访列表</view>

    <view class="relative border-solid border-[1rpx] border-repeat-79 p-2 space-y-2">
      <view>总走访数：{{ visit?.visitNum }}</view>
      <view>点对点走访数：{{ visit?.p2pVisitNum }}</view>
      <view>参与集体走访数：{{ visit?.groupVisitNum }}</view>

      <uni-data-select class="absolute right-2 top-2  w-16" :clear="false" v-model="value" :localdata="range"
        @change="onChange"></uni-data-select>
    </view>

    <view>走访列表</view>

    <view>

      <view class="flex mr-6 text-center mb-2">
        <view class="flex-1">日期</view>
        <view class="flex-1">被走访人</view>
        <view class="flex-1">走访类型</view>
      </view>

      <view class="mr-[-8rpx]">
        <uni-collapse ref="collapse">
          <uni-collapse-item class="py-2" v-for="(item, index) in visit?.visitVOS" :key="index" titleBorder="none"
            :border="false" :open="false">
            <template v-slot:title>
              <view class="flex text-center items-center">
                <view class="flex-1">{{ formatDate(item.visitTime) }}</view>
                <view class="flex-1">{{ item.visitedName }}</view>
                <view class="flex-1">{{ item.type == 0 ? '点对点走访' : '集体走访' }}</view>
              </view>
            </template>
            <view class="mx-4 mt-1 p-1 flex flex-col border-solid border-t-[1rpx] border-repeat-79">
              <view v-if="item.content">
                走访事由：{{ item.content }}
              </view>
              <view v-if="item.comment">
                走访情况：{{ item.comment }}
              </view>
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { myVisit } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app';
import { formatDate } from '@/utils/tools';

let visit = ref()

let value = ref(0);
let range = ref([
  { value: 0, text: '本周' },
  { value: 1, text: '本月' },
  { value: 2, text: '本届' },
  { value: 3, text: '累计' },
]);

onLoad(async () => {
  const { data } = await myVisit({ queryType: value.value })
  visit.value = data
})

const onChange = async (e: any) => {
  // console.log('change事件:', e);
  const { data } = await myVisit({ queryType: e })
  visit.value = data
}
</script>

<style scoped></style>