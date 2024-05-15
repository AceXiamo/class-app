<template>
  <view class="px-4 overflow-auto text-sm">
    <view class="mb-10" v-for="(team, index) in  leaderList " :key="index">
      <view class="font-bold my-4 text-base">第{{ team?.session }}届领导团队</view>
      <view class="flex my-4" v-for="(member, index1) in    team?.pzLeaderVOS   " :key="index1">
        <view class="relative mr-4">
          <image class="w-18 h-18 bg-repeat-77" :src="member?.mainImg" mode="scaleToFill"></image>
          <view class="w-full absolute bottom-2 text-center text-xs">
            {{ member?.leadership_position }}
          </view>
        </view>
        <view class="flex flex-col justify-between">
          <view class="font-bold">
            {{ member?.name }}
          </view>
          <view>
            行业：{{ member?.industry }}
          </view>
          <view>
            {{ member?.company }} {{ member?.position }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { perLeaderList } from '@/api/app/home'
import { onLoad } from '@dcloudio/uni-app';

let leaderList = ref()

onLoad(async () => {
  const { data } = await perLeaderList();
  leaderList.value = data
  if (leaderList.value && leaderList.value.length > 0) {
    leaderList.value.sort((a: { session: number; }, b: { session: number; }) => b.session - a.session);
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
      }
    ]
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
      }
    ]
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
      }
    ]
  }
]);
</script>

<style lang="scss"></style>