<template>
  <view class="overflow-auto h-full p-[30rpx] text-sm">
    <view class="rounded-[16rpx] bg-white w-full pb-4">
      <view
        class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative"
      >
        <view class="w-0.75 h-[28rpx] bg-[#E33531] mr-2"></view>
        <view class="text-base font-bold">我给出的引荐</view>
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
      <view class="flex pt-4 pb-4">
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">引荐数</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{ myRecommend?.recommendNum }}</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">成交金额</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            myRecommend?.recommendAmount
          }}</view>
        </view>
      </view>
      <view class="flex pt-4 pb-4">
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">内部引荐数</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            myRecommend?.innerRecommendNum
          }}</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">内部引荐成交金额</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            myRecommend?.innerRecommendAmount
          }}</view>
        </view>
      </view>
      <view class="flex pt-4 pb-4">
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">外部引荐数</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            myRecommend?.outRecommendNum
          }}</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">外部引荐成交金额</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            myRecommend?.outerRecommendAmount
          }}</view>
        </view>
      </view>
    </view>

    <view class="rounded-[16rpx] bg-white w-full overflow-hidden mt-[30rpx]">
      <view
        class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative"
      >
        <view class="w-0.75 h-[28rpx] bg-[#E33531] mr-2"></view>
        <view class="text-base font-bold">引荐列表</view>
      </view>
      <view>
        <view class="flex text-center mt-[30rpx] mb-[14rpx] leading-[44rpx] font-bold pr-6">
          <view class="flex-1">日期</view>
          <view class="flex-1">被引荐人</view>
          <view class="flex-1">类型</view>
          <view class="flex-1">成交金额</view>
        </view>

        <block v-if="myRecommendList.length">
          <uni-collapse ref="collapse">
            <uni-collapse-item
              v-for="(item, index) in myRecommendList"
              :key="index"
              titleBorder="none"
              :border="false"
              :open="false"
            >
              <template v-slot:title>
                <view class="flex text-center items-center text-[#333] leading-[44rpx] pt-3 pb-3">
                  <view class="flex-1">{{ formatDate(item?.recommendTime) }}</view>
                  <view class="flex-1">{{ item?.recommendedName }}</view>
                  <view class="flex-1">{{ item?.type == 0 ? '内部' : '外部' }}</view>
                  <view class="flex-1">{{ item?.dealAmout }}</view>
                </view>
              </template>
              <view class="mx-4 mt-1 p-1 flex flex-col text-[#999]">
                <view v-if="item?.recommendContent"> 引荐内容：{{ item?.recommendContent }} </view>
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
import { getMyRecommendList, getMyRecommend } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app'
import { formatDate } from '@/utils/tools'

let value = ref(0)
let range = ref([
  { value: 0, text: '本周' },
  { value: 1, text: '本月' },
  { value: 2, text: '本届' },
  { value: 3, text: '累计' },
])

let myRecommend = ref()
let myRecommendList = ref()
onLoad(async () => {
  const recommend = await getMyRecommend({ queryType: value.value })
  myRecommend.value = recommend.data
  const recommendList = await getMyRecommendList({ queryType: value.value })
  myRecommendList.value = recommendList.data
})

const onChange = async (e: any) => {
  // console.log('change事件:', e);
  const recommend = await getMyRecommend({ queryType: e })
  myRecommend.value = recommend.data
  const recommendList = await getMyRecommendList({ queryType: e })
  myRecommendList.value = recommendList.data
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
