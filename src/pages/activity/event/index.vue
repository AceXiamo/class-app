<template>
    <view class="h-[100vh] overflow-hidden relative">
        <scroll-view class="h-[calc(100vh-144rpx)]" scroll-y="true">
            <view class="h-full overflow-auto space-y-4 ios-bottom">
                <image class="w-full bg-repeat-79" mode="aspectFill"
                    src="https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg"></image>

                <view class="px-4 text-xl font-bold mt-2">{{ event?.theme }}</view>

                <view class="px-4">活动时间：{{ event?.eventTime }}</view>

                <view class="flex px-4">
                    <view class="w-[178rpx]">活动地点：</view>
                    <view class="w-full break-all">{{ event?.eventLocation }}</view>
                </view>

                <view class="px-4">报名截止时间：{{ event?.deadline }}</view>

                <view class="px-4 text-xl font-bold">活动详情</view>

                <view class="px-4 mb-2">
                    <mp-html :content="event?.content" />
                </view>
            </view>


        </scroll-view>


        <view
            class="w-full absolute bottom-0 ios-bottom bg-white bg-opacity-60 border-solid border-0 border-t-[1rpx] border-[#DFE6E1]">
            <view class="h-18 flex items-center text-sm">
                <image @tap="toEnroll" v-if="list && list.length > 0" v-for="(i, index) in list" :key="index"
                    :src="i?.avatar"
                    class="rounded-1/2 w-6.75 h-6.75 bg-repeat-ee z-10 absolute border-solid  border border-repeat-79"
                    :style="{ 'left': `${index * 16 + 32}rpx` }">
                </image>
                <view @tap="toEnroll" v-if="list && list.length > 0"
                    class="text-[#8C9993] h-6.75 pr-3 pl-6 absolute rounded-full border-solid border border-repeat-79 flex items-center text-center"
                    :style="{ 'left': `${(list.length >= 5 ? 5 : list.length) * 16 + 36}rpx` }">{{ list.length }}人已报名
                </view>
                <button open-type="share"
                    class="rounded-full text-sm px-3 h-6.75 absolute border-repeat-79 border-solid border flex items-center text-center right-28">
                    分享
                </button>

                <button :disabled="event?.isEnroll"
                    class="rounded-full text-sm px-3 h-6.75 absolute border-repeat-79 border-solid border flex items-center text-center right-4"
                    @tap="Enroll">
                    我要报名
                </button>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import mpHtml from '@/components/mp-html/components/mp-html/mp-html.vue';
</script>

<script lang="ts" setup>
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import { get_20, getEnroll } from '@/api/app/event'
import { ref } from 'vue';
import { useMemberStore } from '@/stores'
import { enroll } from '@/api/event'

let memberStore = useMemberStore()

onShareAppMessage(() => {
    return {
        title: event.value?.theme,
        path: '/pages/activity/event/index?id=' + id.value,
    };
});

const toEnroll = () => {
    uni.navigateTo({ url: `/pages/activity/enroll/index?id=${id.value}` })
}

const Enroll = () => {
    if (!memberStore.profile) {
        uni.navigateTo({ url: '/pages/login/login' })
    } else if (memberStore.profile.userInfo.status != 3 || memberStore.profile.userInfo.status == 4) {
        uni.showModal({
            title: '提示',
            content: '确认报名吗？',
            success: function (res) {
                if (res.confirm) {
                    enroll(id.value).then(res => {
                        if (res.code == 0) {
                            uni.showToast({ title: '报名成功', icon: 'none' })
                            event.value.isEnroll = true
                        } else {
                            uni.showToast({ title: '报名失败', icon: 'none' })
                        }
                    })
                }
            }
        })
    } else {
        uni.navigateTo({ url: '/pages/my/info/info' })
    }

}

let id: any = ref()
let event = ref()
let list: any = ref([])
onLoad((options: any) => {
    id.value = options.id
    get_20({ eventId: options.id }).then(res => {
        event.value = res.data || {}
    })
    getEnroll({ eventId: options.id }).then(res => {
        list.value = res.data || []
    })
});

</script>

<style scoped></style>