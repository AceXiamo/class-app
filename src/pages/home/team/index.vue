<template>
  <view class="px-[30rpx] overflow-auto text-sm pb-[30rpx]">
    <view v-for="(team, index) in leaderList" :key="index">
      <view class="font-medium mt-5 mb-[30rpx] text-xl">第{{ team?.session }}届领导团队</view>
      <view class="bg-white rounded-[16rpx] px-[28rpx]">
        <view
          class="flex py-[30rpx]"
          :class="{
            'border-solid border-0 border-b-[1rpx] border-[#F8F8F8]':
              index1 !== team?.pzLeaderVOS.length - 1,
          }"
          v-for="(member, index1) in team?.pzLeaderVOS"
          :key="index1"
        >
          <view class="relative w-[172rpx] h-[172rpx] mr-4.5">
            <image
              class="w-[172rpx] h-[172rpx] rounded-[8rpx]"
              :src="member?.mainImg"
              mode="scaleToFill"
            ></image>
            <view
              class="w-full absolute bottom-0 text-center text-xs text-white h-5 flex items-center justify-center bg-[rgba(255,255,255,0.5)] rounded-b-[8rpx]"
            >
              {{ member?.leadership_position }}
            </view>
          </view>
          <view class="flex flex-col text-[26rpx]">
            <view class="font-medium text-[30rpx] mt-[18rpx] h-5.5 flex items-center">
              {{ member?.name }}
            </view>
            <view class="mt-1 h-5.5 flex items-center">行业：{{ member?.industry }}</view>
            <view class="h-5.5 flex items-center aaaa"
              >{{ member?.company }}<text class="ml-3">{{ member?.position }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from 'vue'
import { perLeaderList } from '@/api/app/home'
import { onLoad } from '@dcloudio/uni-app'

let leaderList = ref()

onLoad(async () => {
  const { data } = await perLeaderList()
  leaderList.value = data
  if (leaderList.value && leaderList.value.length > 0) {
    leaderList.value.sort((a: { session: number }, b: { session: number }) => b.session - a.session)
  }
})

const teams = ref([
  {
    title: '第二届领导团队',
    members: [
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
    ],
  },
  {
    title: '第二届领导团队',
    members: [
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
    ],
  },
  {
    title: '第二届领导团队',
    members: [
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
      {
        avatar: 'https://img.zcool.cn/community/0111775a9abd19a801219586bae286.JPG@2o.jpg',
        name: '张三',
        industry: '互联网',
        corporation: 'ABC公司',
        job: 'CEO',
      },
    ],
  },
])
</script>

<style lang="scss"></style>
