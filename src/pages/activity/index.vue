<template>
  <view class="h-full text-sm overflow-hidden">
    <view class="h-6 flex justify-between my-4">
      <view @tap="check(index)" v-for="(item, index) in options"
        :class="{ 'font-bold': index == option, 'border-r-black border-solid border-r-[1rpx]': index == 0 }"
        :key="index" class="text-base flex items-center justify-center w-full">{{ item }}</view>
    </view>

    <!-- 组织活动 -->
    <view class="flex justify-center" style="height: calc(100% - 112rpx)">
      <od-list class="w-full" :total="total" :load-more="more" @on-load-more="lowerBottom">
        <view v-if="option == 0" v-for="(item, index) in  list " :key="index" @tap="toEvent(item.id)"
          class="h-44 flex items-center px-2 py-4 my-4 mx-2 border-solid border-repeat-79 border-[1rpx]">
          <view class="h-full text-xs flex-1 px-1 flex flex-col">
            <view class="text-base font-bold break-all line-clamp-2 h-12">{{ item?.theme }}</view>
            <view class="mt-4">活动时间：{{ item?.eventTime }}</view>
            <view class="flex mt-4">
              <view class="w-[152rpx]">活动地点：</view>
              <view class="break-all line-clamp-2 w-full">{{ item?.eventLocation }}
              </view>
            </view>
          </view>
          <view class="ml-2 flex flex-col items-end">
            <image mode="aspectFill" class="w-25 h-25 border-solid border-repeat-79 border-[1rpx]" :src="item?.mainImg">
            </image>
            <view class="mt-4 text-center w-16 rounded-md p-1 border-[1rpx] border-solid border-repeat-79"
              :class="item?.isEnroll ? 'bg-repeat-f7' : ''">
              {{ item?.isEnroll ? '已报名' : '报名' }}</view>
          </view>
        </view>

        <view v-if="option == 1" v-for="( item, index ) in  list " :key="index" @tap="toNews(item.id)"
          class="h-36 flex items-center px-2 py-4 my-4 mx-2 border-solid border-repeat-79 border-[1rpx]">
          <view class="h-full text-xs flex-1 px-1 flex flex-col justify-between">
            <view class="text-base font-bold break-all line-clamp-2">{{ item?.title }}</view>
            <view class="mt-2">发布时间：{{ item?.publishTime }}</view>
            <view>来源：{{ item?.origin }}</view>
          </view>
          <view class="ml-2">
            <image mode="aspectFill" class="w-25 h-25 border-solid border-repeat-79 border-[1rpx]" :src="item?.image">
            </image>
          </view>
        </view>
        <template #empty>
          <view class="pb-[50rpx] text-xs flex items-center justify-center text-repeat-aa">
            没有更多了
          </view>
        </template>
      </od-list>
    </view>

  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import OdList from '@/components/list/index.vue';
import { computed, ref } from 'vue';
import * as event from '@/api/app/event'
import { page_23 } from '@/api/app/news'
import { onLoad, onShow } from '@dcloudio/uni-app';

let page = ref(1)
let list: any = ref([])
let recordTotal = ref(0)
let total = ref(0)
const more = computed(() => {
  return list.value.length < recordTotal.value;
});

const toEvent = (id: number) => {
  uni.navigateTo({ url: `/pages/activity/event/index?id=${id}` })
}

const toNews = (id: number) => {
  uni.navigateTo({ url: `/pages/activity/news/index?id=${id}` })
}

const lowerBottom = () => {
  page.value++
  loadData()
}

const loadData = () => {
  if (option.value == 0) {
    event.page_24({ page: page.value, limit: 10 }).then(res => {
      recordTotal.value = res.data?.total
      if (res.data?.list) {
        list.value = list.value.concat(res.data?.list)
      }
      total.value = res.data?.list.length || 0
      if (total.value < 10) {
        total.value = 0
      }
    })
  } else {
    page_23({ page: page.value, limit: 10 }).then(res => {
      recordTotal.value = res.data?.total
      if (res.data?.list) {
        list.value = list.value.concat(res.data?.list)
      }
      total.value = res.data?.list.length || 0
      if (total.value < 10) {
        total.value = 0
      }
    })
  }
}

let option = ref(0);
let options = ['活动报名', '组织资讯'];
const check = (index: number) => {
  option.value = index;
  page.value = 1
  list.value = []
  recordTotal.value = 0
  total.value = 0
  loadData()
}

onShow(() => {
  page.value = 1
  list.value = []
  recordTotal.value = 0
  total.value = 0
  loadData()
})



</script>

<style scoped></style>
