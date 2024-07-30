<template>
  <view class="text-sm overflow-x-auto">
    <!-- 日期选项 -->
    <view class="bg-white m-[30rpx] pb-[72rpx] rounded-[16rpx]">
      <view class="p-4">
        <slider-tab v-model="curValue" :tabs="tabs" @change="onChange">
          <template #="{ active, tab, index }">
            <view
              :class="[
                'h-10 text-[26rpx] text-[#666] flex items-center relative justify-center',
                {
                  'font-bold': active,
                  'text-[30rpx]': active,
                  'text-[#000]': active,
                  'mr-4': index !== tabs?.length - 1,
                },
              ]"
            >
              {{ tab?.year }}年{{ tab?.month }}月
              <view v-if="active" class="bg-[#92003F] w-[30rpx] h-[6rpx] absolute bottom-1"></view>
            </view>
          </template>
        </slider-tab>
      </view>

      <!-- 内容区域 -->
      <view>
        <view class="flex mt-4">
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{ monthData?.recommendNum }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出引荐</view>
          </view>
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{
              monthData?.outRecommendNum
            }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出外部引荐</view>
          </view>
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{
              monthData?.innerRecommendNum
            }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出内部引荐</view>
          </view>
        </view>
      </view>
      <view class="flex mt-8">
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{ monthData?.submitMoneySum }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">给出成交金额</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{
            monthData?.harvestMoneySum
          }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">收到成交金额</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{ monthData?.guestNum }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">嘉宾数</view>
        </view>
      </view>
    </view>

    <!-- 第几届选项 -->
    <view v-if="tabs1" class="bg-white m-[30rpx] pb-[72rpx] rounded-[16rpx]">
      <view class="p-4">
        <slider-tab v-model="curValue1" :tabs="tabs1" @change="onChange1">
          <template #="{ active, tab, index }">
            <view
              :class="[
                'h-10 text-[26rpx] text-[#666] flex items-center relative justify-center',
                {
                  'font-bold': active,
                  'text-[30rpx]': active,
                  'text-[#000]': active,
                  'mr-4': index !== tabs.length - 1,
                },
              ]"
            >
              第{{ tab?.session }}届
              <view v-if="active" class="bg-[#92003F] w-[30rpx] h-[6rpx] absolute bottom-1"></view>
            </view>
          </template>
        </slider-tab>
      </view>

      <!-- 内容区域 -->
      <view>
        <view class="flex mt-4">
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{
              sessionData?.recommendNum
            }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出引荐</view>
          </view>
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{
              sessionData?.outRecommendNum
            }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出外部引荐</view>
          </view>
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{
              sessionData?.innerRecommendNum
            }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出内部引荐</view>
          </view>
        </view>
      </view>
      <view class="flex mt-8">
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{
            sessionData?.submitMoneySum
          }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">给出成交金额</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{
            sessionData?.harvestMoneySum
          }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">收到成交金额</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{ sessionData?.guestNum }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">嘉宾数</view>
        </view>
      </view>
    </view>

    <!-- 累计 -->
    <view class="bg-white m-[30rpx] pb-[72rpx] rounded-[16rpx]">
      <view class="p-4">
        <view class="text-[30rpx] font-bold">创会累计</view>
      </view>

      <!-- 内容区域 -->
      <view>
        <view class="flex mt-4">
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{ totalData?.recommendNum }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出引荐</view>
          </view>
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{
              totalData?.outRecommendNum
            }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出外部引荐</view>
          </view>
          <view class="flex-1 text-center">
            <view class="text-[30rpx] text-[#92003F] font-bold">{{
              totalData?.innerRecommendNum
            }}</view>
            <view class="mt-1 text-[24rpx] text-[#333]">给出内部引荐</view>
          </view>
        </view>
      </view>
      <view class="flex mt-8">
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{ totalData?.submitMoneySum }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">给出成交金额</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{
            totalData?.harvestMoneySum
          }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">收到成交金额</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[30rpx] text-[#92003F] font-bold">{{ totalData?.guestNum }}</view>
          <view class="mt-1 text-[24rpx] text-[#333]">嘉宾数</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import SliderTab from '@/components/sliderTab/index.vue'
import { ref } from 'vue'
import { getTabs } from '@/utils/tools'
import { onLoad } from '@dcloudio/uni-app'
import * as homeApi from '@/api/app/home'

let curValue = ref(1)
let tabs: any = ref(getTabs(new Date(2023, 3)))

let monthData: any = ref()

let sessionData: any = ref()

let totalData: any = ref()

let curValue1 = ref(1)

let tabs1: any = ref()

onLoad(() => {
  // console.log(tabs.value)
  homeApi
    .dateMoneyList({ year: tabs.value[0]?.year, month: tabs.value[0]?.month })
    .then((result) => {
      monthData.value = result.data
    })

  homeApi.perLeaderList().then((result: any) => {
    if (result.data && result.data.length > 0) {
      tabs1.value = extractSession(result.data)
      // console.log(tabs1.value)
      homeApi.sessionMoney({ session: tabs1.value[0]?.session }).then((result) => {
        sessionData.value = result.data
      })
    }
  })

  homeApi.allMoney().then((result) => {
    // console.log(result.data, 'allMoney')
    totalData.value = result.data
  })
})

const onChange = async (index: any) => {
  // console.log(index);
  const result = await homeApi.dateMoneyList({ year: index?.year, month: index?.month })
  monthData.value = result.data
}

const onChange1 = async (index: any) => {
  // console.log(index);
  const result = await homeApi.sessionMoney({ session: index?.session })
  sessionData.value = result.data
}

interface NewItem {
  key: number
  session: number
}
const extractSession = (originalArray: any[]): NewItem[] => {
  const extractedSessions: NewItem[] = []
  // 提取并转换session字段
  originalArray.forEach((item) => {
    extractedSessions.push({ key: 0, session: item.session })
  })
  // 按session大小降序排序
  extractedSessions.sort((a, b) => b.session - a.session)
  // 添加key字段
  for (let i = 0; i < extractedSessions.length; i++) {
    extractedSessions[i].key = i + 1
  }
  return extractedSessions
}
</script>

<style lang="scss" scoped>
.active {
  color: #1f065a;
  font-weight: 600;
}

.active::after {
  content: '';
  width: 60%;
  display: block;
  margin: auto;
  margin-bottom: -40rpx;
  padding: 11rpx;
  border-bottom: 6rpx solid #1f065a;
}
</style>
