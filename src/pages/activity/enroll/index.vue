<template>
    <view class="h-full overflow-auto space-y-4 flex flex-col">
        <view class="flex mt-4 items-center font-bold">
            <view class="w-20 h-1"></view>
            <view class="flex-1 text-center">姓名</view>
            <view class="flex-1 text-center">行业</view>
        </view>
        <view v-for="(item, index) in list" :key="index" class="flex items-center">
            <image @tap="toDetail(item?.id)" :src="item?.avatar"
                class="w-12 h-12 mx-4 rounded-1/2 border-[1rpx] border-solid border-repeat-79">
            </image>
            <view class="flex-1 text-center">{{ item?.name }}</view>
            <view class="flex-1 text-center">{{ item?.industry }}</view>
        </view>
    </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { getEnroll } from '@/api/app/event'

const toDetail = (id: number) => {
    uni.navigateTo({ url: `/pages/member/detail/index?id=${id}` })
}


let list: any = ref([])
onLoad((options: any) => {
    getEnroll({ eventId: options.id }).then(res => {
        list.value = res.data || []
    })
});

</script>

<style scoped></style>