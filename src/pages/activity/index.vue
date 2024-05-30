<template>
  <view class="h-full text-sm overflow-hidden">
    <view class="h-[60rpx] flex justify-between py-[20rpx] bg-white">
      <view
        @tap="check(index)"
        v-for="(item, index) in options"
        :class="{
          'text-[#92003F]': index === option,
          'text-black': index !== option,
          'border-0 border-r-[#F8F8F8] border-solid border-r-[1rpx]': index == 0,
        }"
        :key="index"
        class="text-base flex items-center justify-center w-full font-medium relative"
      >
        <image
          v-show="0 === option && index === 0"
          src="/static/images/icon-event-selected.png"
          class="w-4.5 h-4.5 mr-[10rpx]"
        />
        <image
          v-show="1 === option && index === 0"
          src="/static/images/icon-event.png"
          class="w-4.5 h-4.5 mr-[10rpx]"
        />
        <image
          v-show="1 === option && index === 1"
          src="/static/images/icon-news-selected.png"
          class="w-4.5 h-4.5 mr-[10rpx]"
        />
        <image
          v-show="0 === option && index === 1"
          src="/static/images/icon-news.png"
          class="w-4.5 h-4.5 mr-[10rpx]"
        />
        {{ item }}
        <view
          v-if="index === option"
          class="bg-[#92003F] w-[124rpx] h-0.75 absolute bottom-[-20rpx]"
        ></view>
      </view>
    </view>

    <!-- 组织活动 -->
    <view class="flex justify-center" style="height: calc(100% - 100rpx)">
      <od-list class="w-full" :total="total" :load-more="more" @on-load-more="lowerBottom">
        <view
          v-if="option == 0"
          v-for="(item, index) in [
            {
              id: 1,
              theme: 'test',
              eventTime: '2023-03-01',
              eventLocation: 'test',
              mainImg: '/static/images/icon-event.png',
              isEnroll: true,
            },
          ]"
          :key="index"
          @tap="toEvent(item.id)"
          class="flex items-center px-[28rpx] pt-[30rpx] pb-[34rpx] m-[30rpx] rounded-[16rpx] bg-white text-repeat-33"
        >
          <view class="h-full text-[26rpx] flex-1 flex flex-col">
            <view
              class="font-medium break-all line-clamp-2 text-[30rpx] h-[92rpx] flex items-center text-black"
              >{{ item?.theme }}</view
            >
            <view class="mt-1 flex items-center h-5.5">活动时间：{{ item?.eventTime }}</view>
            <view class="break-all line-clamp-1 flex w-full">
              <view class="w-[190rpx]">活动地点：</view>
              <view class="break-all line-clamp-2 w-full h-[78rpx]">
                {{ item?.eventLocation }} 11111111111111111111111111111111111111111111111
              </view>
            </view>
          </view>
          <view class="ml-4 flex flex-col items-end">
            <image
              mode="aspectFill"
              class="w-[172rpx] h-[172rpx] rounded-[8rpx]"
              :src="item?.mainImg"
            >
            </image>
            <view
              class="mt-4 text-center w-16 rounded-md p-1 border-[1rpx] border-solid border-repeat-79"
              :class="item?.isEnroll ? 'bg-repeat-f7' : ''"
            >
              {{ item?.isEnroll ? '已报名' : '报名' }}</view
            >
          </view>
        </view>

        <view
          v-if="option == 1"
          v-for="(item, index) in list"
          :key="index"
          @tap="toNews(item.id)"
          class="flex items-center px-[28rpx] pt-[30rpx] pb-[34rpx] m-[30rpx] rounded-[16rpx] bg-white text-repeat-33"
        >
          <view class="h-full text-[26rpx] flex-1 flex flex-col">
            <view
              class="font-medium break-all line-clamp-2 text-[30rpx] h-[92rpx] flex items-center text-black"
              >{{ item?.title }}</view
            >
            <view class="mt-1 flex items-center h-5.5">发布时间：{{ item?.publishTime }}</view>
            <view class="break-all line-clamp-1 h-5.5">来源：{{ item?.origin }}</view>
          </view>
          <view class="ml-4">
            <image
              mode="aspectFill"
              class="w-[172rpx] h-[172rpx] rounded-[8rpx]"
              :src="item?.image"
            >
            </image>
          </view>
        </view>
        <template #empty>
          <view class="pt-4 pb-[50rpx] text-xs flex items-center justify-center text-repeat-aa">
            没有更多了
          </view>
        </template>
      </od-list>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import OdList from '@/components/list/index.vue'
import { computed, ref } from 'vue'
import * as event from '@/api/app/event'
import { page_23 } from '@/api/app/news'
import { onLoad, onShow } from '@dcloudio/uni-app'

let page = ref(1)
let list: any = ref([])
let recordTotal = ref(0)
let total = ref(0)
const more = computed(() => {
  return list.value.length < recordTotal.value
})

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
    event.page_24({ page: page.value, limit: 10 }).then((res) => {
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
    page_23({ page: page.value, limit: 10 }).then((res) => {
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

let option = ref(0)
let options = ['活动报名', '组织资讯']
const check = (index: number) => {
  option.value = index
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
