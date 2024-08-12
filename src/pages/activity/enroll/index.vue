<template>
  <view class="h-full overflow-auto flex flex-col">
    <view class="flex mt-[54rpx] font-bold mb-[38rpx]">
      <view class="w-[148rpx] h-1"></view>
      <view class="w-[114rpx] text-center">姓名</view>
      <view class="ml-[66rpx] w-[174rpx] text-center">行业</view>
    </view>
    <view
      v-for="(item, index) in list"
      :key="index"
      class="flex items-center mb-[30rpx] text-[#666]"
    >
      <image
        @tap="toDetail(item?.id)"
        :src="item?.avatar || default_avatar"
        class="w-[68rpx] h-[68rpx] ml-[40rpx] rounded-1/2"
      >
      </image>
      <view class="ml-[48rpx] w-[160rpx]">{{ item?.name }}</view>
      <view class="ml-[46rpx]">{{ item?.industry }}</view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getEnroll } from '@/api/app/event'

const default_avatar =
  'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'

const toDetail = (id: number) => {
  uni.navigateTo({ url: `/pages/member/detail/index?id=${id}` })
}

let list: any = ref([])
onLoad((options: any) => {
  getEnroll({ eventId: options.id }).then((res) => {
    list.value = res.data || []
  })
})
</script>

<style>
page {
  background: #ffffff;
}
</style>
