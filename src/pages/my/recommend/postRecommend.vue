<template>
  <view class="overflow-auto h-full p-[30rpx] text-sm">
    <view class="rounded-[16rpx] bg-white w-full">
      <view
        class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative"
      >
        <view class="w-0.75 h-[28rpx] bg-[#92003F] mr-2"></view>
        <view>我给出的引荐</view>
        <view class="w-[122rpx] h-[42rpx] rounded-full absolute right-[30rpx]">
          <uni-data-select
            class="w-16"
            :clear="false"
            v-model="value"
            :localdata="range"
            @change="onChange"
          ></uni-data-select>
        </view>
      </view>
      <view class="flex">
        <view class="w-2/5">引荐数：{{ myRecommend?.recommendNum }}</view>
        <view class="w-3/5">成交金额：{{ myRecommend?.recommendAmount }}</view>
      </view>
      <view class="flex">
        <view class="w-2/5">内部引荐数：{{ myRecommend?.innerRecommendNum }}</view>
        <view class="w-3/5">内部引荐成交金额：{{ myRecommend?.innerRecommendAmount }}</view>
      </view>
      <view class="flex">
        <view class="w-2/5">外部引荐数：{{ myRecommend?.outRecommendNum }}</view>
        <view class="w-3/5">外部引荐成交金额：{{ myRecommend?.outerRecommendAmount }}</view>
      </view>
    </view>

    <view class="text-base font-bold">引荐列表</view>

    <view>
      <view class="flex mr-6 text-center mb-2">
        <view class="flex-1">日期</view>
        <view class="flex-1">引荐人</view>
        <view class="flex-1">类型</view>
        <view class="flex-1">成交金额</view>
      </view>

      <view class="mr-[-8rpx]">
        <uni-collapse ref="collapse">
          <uni-collapse-item
            class="py-2"
            v-for="(item, index) in myRecommendList"
            :key="index"
            titleBorder="none"
            :border="false"
            :open="false"
          >
            <template v-slot:title>
              <view class="flex text-center items-center">
                <view class="flex-1">{{ formatDate(item?.recommendTime) }}</view>
                <view class="flex-1">{{ item?.recommendedName }}</view>
                <view class="flex-1">{{ item?.type == 0 ? '内部' : '外部' }}</view>
                <view class="flex-1">{{ item?.dealAmout }}</view>
              </view>
            </template>
            <view class="mx-2 mt-1 p-1 flex border-solid border-t-[1rpx] border-repeat-79">
              <view v-if="item?.recommendContent"> 引荐内容：{{ item?.recommendContent }} </view>
            </view>
          </uni-collapse-item>
        </uni-collapse>
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
  color: #92003f !important;
}

::v-deep .uni-icons {
  color: #92003f !important;
}
</style>
