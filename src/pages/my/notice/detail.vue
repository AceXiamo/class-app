<template>
    <view class="overflow-auto h-full p-4 bg-repeat-f7 ios-bottom">
        <view class="w-full bg-white p-4">
            <view class="font-bold">{{ notice?.type == 1 ? '系统通知' : '' }}</view>

            <view class="mt-4">{{ notice?.content }}</view>

            <view class="text-xs text-repeat-99 mt-8">{{ notice?.createTime }}</view>
        </view>
    </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { getNotice } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app';

let notice = ref()
onLoad((option: any) => {
    getNotice({ id: option.id }).then(res => {
        notice.value = res.data
    })
});

</script>

<style scoped></style>