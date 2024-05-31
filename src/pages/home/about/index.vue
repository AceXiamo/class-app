<template>
  <view class="px-[30rpx] py-3 text-justify">
    <mp-html :content="content" />
  </view>
</template>

<script lang="ts">
import mpHtml from '@/components/mp-html/components/mp-html/mp-html.vue'
export default {
  name: 'HomeAbout',
  components: {
    mpHtml,
  },
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import * as homeApi from '@/api/app/home'
import { onLoad } from '@dcloudio/uni-app'

let content: any = ref('')

onLoad(async () => {
  const { data } = await homeApi.moreShow_1()
  content.value = data
})
</script>

<style lang="scss" scoped>
page {
  background-color: white;
}
</style>
