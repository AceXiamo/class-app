<template>
  <view class="overflow-auto p-4 bg-repeat-f7 h-full space-y-4 ios-bottom">
    <view
      @tap="toDetail(item?.id)"
      v-for="(item, index) in unread"
      :key="index"
      class="p-4 w-full bg-white"
    >
      <view class="border-0 border-b-[1rpx] border-solid border-repeat-f7 pb-4 relative">
        <view class="font-bold">{{ item?.type == 1 ? '系统通知' : '' }}</view>
        <view class="absolute right-4 top-0 text-repeat-99">{{ item?.createTime }}</view>
        <view class="absolute right-0 w-1.5 h-1.5 top-2 bg-red-500 rounded-1/2" />
      </view>
      <view class="break-all mt-4">{{ item?.content }}</view>
    </view>

    <view v-if="unread && unread.length > 0" class="text-repeat-99 text-xs w-full text-center pt-8"
      >-以下为未读通知-</view
    >

    <view
      @tap="toDetail(item?.id)"
      v-for="(item, index) in read"
      :key="index"
      class="p-4 w-full bg-white"
    >
      <view class="border-0 border-b-[1rpx] border-solid border-repeat-f7 pb-4 relative">
        <view class="font-bold">{{ item?.type == 1 ? '系统通知' : '' }}</view>
        <view class="absolute right-0 top-0 text-repeat-99">{{ item?.createTime }}</view>
      </view>
      <view class="break-all mt-4">{{ item?.content }}</view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from 'vue'
import { getMyNoticeList } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app'

const toDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/my/notice/detail?id=${id}`,
  })
}

let read: any = ref([])
let unread: any = ref([])
onLoad(() => {
  getMyNoticeList().then((res) => {
    if (res.data) {
      read.value = res.data?.noticeVOList
      unread.vaue = res.data?.unreadNoticeVOList
    }
    console.log(unread.vaue)
  })
})
</script>

<style scoped></style>
