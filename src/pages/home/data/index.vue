<template>
  <view class="text-sm overflow-x-auto">
    <!-- 日期选项 -->
    <view class="p-4 pb-2">
      <slider-tab v-model="curValue" :tabs="tabs" @change="onChange">
        <template #="{ active, tab, index }">
          <view :class="['h-10 text-base flex items-center', {
        'font-bold': active,
        'mr-4': index !== tabs?.length - 1
      }]">
            {{ tab?.year }}年{{ tab?.month }}月
          </view>
        </template>
      </slider-tab>
    </view>

    <!-- 内容区域 -->
    <view>
      <view class="flex">
        <view class="flex-1 text-center">
          <view class="mt-2">{{ monthData?.recommendNum }}</view>
          <view class="mt-2">给出引荐</view>
        </view>
        <view class="flex-1 text-center">
          <view class="mt-2">{{ monthData?.outRecommendNum }}</view>
          <view class="mt-2">给出外部引荐</view>
        </view>
        <view class="flex-1 text-center">
          <view class="mt-2">{{ monthData?.innerRecommendNum }}</view>
          <view class="mt-2">给出内部引荐</view>
        </view>
      </view>
    </view>
    <view class="flex">
      <view class="flex-1 text-center">
        <view class="mt-2">{{ monthData?.submitMoneySum }}</view>
        <view class="mt-2">给出成交金额</view>
      </view>
      <view class="flex-1 text-center">
        <view class="mt-2">{{ monthData?.harvestMoneySum }}</view>
        <view class="mt-2">收到成交金额</view>
      </view>
      <view class="flex-1 text-center">
        <view class="mt-2">{{ monthData?.guestNum }}</view>
        <view class="mt-2">嘉宾数</view>
      </view>
    </view>
    <view class="mx-4 mt-4 border-solid border-b-[1rpx] border-repeat-79"></view>

    <!-- 日期选项 -->
    <view v-if="tabs1" class="p-4 pb-2">
      <slider-tab v-model="curValue1" :tabs="tabs1" @change="onChange1">

        <template #="{ active, tab, index }">
          <view :class="['h-10 text-base flex items-center', {
        'font-bold': active,
        'mr-4': index !== tabs.length - 1
      }]">
            第{{ tab?.session }}届
          </view>
        </template>
      </slider-tab>
    </view>

    <!-- 内容区域 -->
    <view v-if="tabs1">
      <view class="flex">
        <view class="flex-1 text-center">
          <view class="mt-2">{{ sessionData?.recommendNum }}</view>
          <view class="mt-2">给出引荐</view>
        </view>
        <view class="flex-1 text-center">
          <view class="mt-2">{{ sessionData?.outRecommendNum }}</view>
          <view class="mt-2">给出外部引荐</view>
        </view>
        <view class="flex-1 text-center">
          <view class="mt-2">{{ sessionData?.innerRecommendNum }}</view>
          <view class="mt-2">给出内部引荐</view>
        </view>
      </view>
    </view>
    <view v-if="tabs1" class="flex mt-2">
      <view class="flex-1 text-center">
        <view class="mt-2">{{ sessionData?.submitMoneySum }}</view>
        <view class="mt-2">给出成交金额</view>
      </view>
      <view class="flex-1 text-center">
        <view class="mt-2">{{ sessionData?.harvestMoneySum }}</view>
        <view class="mt-2">收到成交金额</view>
      </view>
      <view class="flex-1 text-center">
        <view class="mt-2">{{ sessionData?.guestNum }}</view>
        <view class="mt-2">嘉宾数</view>
      </view>
    </view>
    <view v-if="tabs1" class="mx-4 mt-4 border-solid border-b-[1rpx] border-repeat-79"></view>

    <!-- 日期选项 -->
    <view class="p-4 pb-2 ">
      <view class="text-base h-10 font-bold flex items-center">创会累计</view>
    </view>

    <!-- 内容区域 -->
    <view>
      <view class="flex">
        <view class="flex-1 text-center">
          <view class="mt-2">{{ totalData?.recommendNum }}</view>
          <view class="mt-2">给出引荐</view>
        </view>
        <view class="flex-1 text-center">
          <view class="mt-2">{{ totalData?.outRecommendNum }}</view>
          <view class="mt-2">给出外部引荐</view>
        </view>
        <view class="flex-1 text-center">
          <view class="mt-2">{{ totalData?.innerRecommendNum }}</view>
          <view class="mt-2">给出内部引荐</view>
        </view>
      </view>
    </view>
    <view class="flex mt-2 mb-10">
      <view class="flex-1 text-center">
        <view class="mt-2">{{ totalData?.submitMoneySum }}</view>
        <view class="mt-2">给出成交金额</view>
      </view>
      <view class="flex-1 text-center">
        <view class="mt-2">{{ totalData?.harvestMoneySum }}</view>
        <view class="mt-2">收到成交金额</view>
      </view>
      <view class="flex-1 text-center">
        <view class="mt-2">{{ totalData?.guestNum }}</view>
        <view class="mt-2">嘉宾数</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import SliderTab from '@/components/sliderTab/index.vue';
import { ref } from 'vue';
import { getTabs } from '@/utils/tools';
import { onLoad } from '@dcloudio/uni-app';
import * as homeApi from '@/api/app/home'

let curValue = ref(1);
let tabs: any = ref(getTabs(new Date(2023, 3)))

let monthData: any = ref()

let sessionData: any = ref()

let totalData: any = ref()

let curValue1 = ref(1);

let tabs1: any = ref();

onLoad(() => {
  // console.log(tabs.value)
  homeApi.dateMoneyList({ year: tabs.value[0]?.year, month: tabs.value[0]?.month }).then(result => {
    monthData.value = result.data
  })

  homeApi.perLeaderList().then((result: any) => {
    if (result.data && result.data.length > 0) {
      tabs1.value = extractSession(result.data)
      // console.log(tabs1.value)
      homeApi.sessionMoney({ session: tabs1.value[0]?.session }).then(result => {
        sessionData.value = result.data
      })
    }
  })

  homeApi.allMoney().then(result => {
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
  key: number;
  session: number;
}
const extractSession = (originalArray: any[]): NewItem[] => {
  const extractedSessions: NewItem[] = [];
  // 提取并转换session字段
  originalArray.forEach(item => {
    extractedSessions.push({ key: 0, session: item.session });
  });
  // 按session大小降序排序
  extractedSessions.sort((a, b) => b.session - a.session);
  // 添加key字段
  for (let i = 0; i < extractedSessions.length; i++) {
    extractedSessions[i].key = i + 1;
  }
  return extractedSessions;
}


</script>

<style lang="scss" scoped>
.active {
  color: #1F065A;
  font-weight: 600;
}

.active::after {
  content: "";
  width: 60%;
  display: block;
  margin: auto;
  margin-bottom: -40rpx;
  padding: 11rpx;
  border-bottom: 6rpx solid #1F065A;
}
</style>