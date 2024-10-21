<template>
  <web-view v-if="news && news.url" :src="news.url" />
  <view class="h-full">
    <view class="px-4 pt-4">
      <view class="text-xl font-bold">{{ news?.title }}</view>

      <view class="flex items-center mt-2 text-gray-500 text-sm">
        发布时间：{{ news?.publishTime }}
      </view>
      <view class="flex items-center mt-2 text-gray-500 text-sm"> 来源：{{ news?.origin }} </view>
      <view class="mt-4" style="font-size: 26rpx">
        <mp-html :content="news?.content" class="text-justify" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import mpHtml from '@/components/mp-html/components/mp-html/mp-html.vue'
</script>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { getContent } from '@/api/app/news'
import { ref } from 'vue'

let news = ref()
onLoad((options: any) => {
  console.log(options)
  getContent({ id: options.id }).then((res) => {
    news.value = res.data || {}
  })
})
</script>

<style scoped></style>
