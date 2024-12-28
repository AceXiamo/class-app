<template>
  <view class="overflow-auto p-4 text-sm h-full space-y-4">
    <view class="rounded-[16rpx] bg-white w-full">
      <view
        class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative"
      >
        <view class="w-0.75 h-[28rpx] bg-[#E33531] mr-2"></view>
        <view class="text-base font-bold">我的走访列表</view>
        <view class="w-[108rpx] h-[42rpx] rounded-full absolute right-[30rpx]">
          <uni-data-select
            class="w-16"
            :clear="false"
            v-model="value"
            :localdata="range"
            @change="onChange"
          ></uni-data-select>
        </view>
      </view>

      <view class="flex item-center pt-6 pb-6">
        <view class="flex-1 text-center">
          <view>总走访数</view>
          <view class="text-[40rpx] text-[#E33531] font-bold mt-1">{{ visit?.visitNum }}</view>
        </view>
        <view class="flex-1 text-center">
          <view>点对点走访数</view>
          <view class="text-[40rpx] text-[#E33531] font-bold mt-1">{{ visit?.p2pVisitNum }}</view>
        </view>
        <view class="flex-1 text-center">
          <view>参与集体走访数</view>
          <view class="text-[40rpx] text-[#E33531] font-bold mt-1">{{ visit?.groupVisitNum }}</view>
        </view>
      </view>
    </view>

    <view class="rounded-[16rpx] bg-white w-full overflow-hidden">
      <view
        class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative"
      >
        <view class="w-0.75 h-[28rpx] bg-[#E33531] mr-2"></view>
        <view class="text-base font-bold">走访列表</view>
      </view>
      <view>
        <view class="flex text-center mt-[30rpx] mb-[14rpx] leading-[44rpx] font-bold pr-6">
          <view class="flex-1">日期</view>
          <view class="flex-1">被走访人</view>
          <view class="flex-1">走访类型</view>
        </view>

        <block v-if="visit?.visitVOS.length">
          <uni-collapse ref="collapse">
            <uni-collapse-item
              v-for="(item, index) in visit?.visitVOS"
              :key="index"
              titleBorder="none"
              :border="false"
              :open="false"
            >
              <template v-slot:title>
                <view class="flex text-center items-center text-[#333] leading-[44rpx] pt-3 pb-3">
                  <view class="flex-1">{{ formatDate(item.visitTime) }}</view>
                  <view class="flex-1">{{ item.visitedName }}</view>
                  <view class="flex-1">{{ item.type == 0 ? '点对点走访' : '集体走访' }}</view>
                </view>
              </template>
              <view class="mx-4 mt-1 p-1 flex flex-col text-[#999]">
                <view v-if="item.content"> 走访事由：{{ item.content }} </view>
                <view v-if="item.comment"> 走访情况：{{ item.comment }} </view>
              </view>
            </uni-collapse-item>
          </uni-collapse>
        </block>
        <view v-else class="text-center text-[#999] text-xs py-2">暂无信息</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from 'vue'
import { myVisit } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app'
import { formatDate } from '@/utils/tools'

let visit = ref()

let value = ref(0)
let range = ref([
  { value: 0, text: '本周' },
  { value: 1, text: '本月' },
  { value: 2, text: '本届' },
  { value: 3, text: '累计' },
])

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
  color: #e33531 !important;
  text-align: right !important;
}

::v-deep .uni-icons {
  color: #e33531 !important;
  margin: 0 6rpx 0 8rpx !important;
}

::v-deep .uni-collapse-item__title {
  border-bottom: 2rpx solid #f8f8f8;
}
</style>
