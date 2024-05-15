<template>
  <view class="h-full text-sm overflow-hidden">
    <!-- 搜索框 -->
    <view class="mt-2 w-full px-4">
      <search-bar :placeholder="''" @search="search" />
    </view>

    <view class="h-12 flex justify-between">
      <view @tap="check(index)" v-for="(item, index) in options" :class="{ 'font-bold': index == i }" :key="index"
        hover-class="bg-{#eef1f4}" class="flex items-center justify-center w-full">{{ item }}</view>
    </view>

    <view class="px-2">
      <slider-tab v-model="curValue" :tabs="tabs" @change="onChange">
        <template #="{ active, tab, index }">
          <view :class="['h-6 text-xs flex items-center', {
        'font-bold': active,
        'mx-2': index !== tabs.length - 1
      }]">
            {{ tab.title }}
          </view>
        </template>
      </slider-tab>
    </view>

    <view class="flex justify-center" style="height: calc(100% - 224rpx)">
      <od-list class="w-full" :total="total" :load-more="more" @on-load-more="lowerBottom">
        <view v-for="(item, index) in list" :key="index"
          class="m-4 border-solid border-repeat-79 border-[1rpx] rounded-md">
          <view @tap="toDetail(item?.id)"
            class="flex m-[-1rpx] p-4 border-solid border-repeat-79 border-[1rpx] rounded-md">
            <view class="relative w-16 h-20">
              <image mode="aspectFill" class="w-16 h-16 border-solid border-repeat-79 border-[1rpx] bg-black"
                :src="!memberStore.profile || memberStore.profile?.userInfo?.status == 0 || memberStore.profile?.userInfo?.status == 1 || memberStore.profile?.userInfo?.status == 2 ? '' : item?.avatar">
              </image>
              <view v-if="item?.leadership_position && item?.leadership_position != ''"
                class="absolute text-xs py-0.5 w-20 text-center bottom-[-12rpx] left-[-16rpx] rounded-full bg-white border-solid border-repeat-79 border-[1rpx]">
                {{ item?.leadership_position }}</view>
            </view>
            <view class="h-20 w-full ml-6 text-xs flex flex-col justify-between">
              <view class="font-bold text-sm">{{ item?.name }}</view>
              <view class="w-full line-clamp-1">行业：{{ item?.industry }}</view>
              <view class="w-full flex">
                <view class="">{{ !memberStore.profile || memberStore.profile?.userInfo?.status == 0 ||
        memberStore.profile?.userInfo?.status == 1 || memberStore.profile?.userInfo?.status ==
        2 ? '' : item?.company
                  }}</view>
                <view class="ml-6">{{ !memberStore.profile || memberStore.profile?.userInfo?.status == 0 ||
        memberStore.profile?.userInfo?.status == 1 || memberStore.profile?.userInfo?.status ==
        2 ? '' : item?.position }}</view>
              </view>
              <view class="w-full flex items-center">
                <image mode="aspectFill" class="w-4 h-4 mr-2" src="@/static/images/navigation.png">
                </image>
                {{ !memberStore.profile || memberStore.profile?.userInfo?.status == 0 ||
        memberStore.profile?.userInfo?.status == 1 || memberStore.profile?.userInfo?.status ==
        2 || memberStore.profile?.userInfo?.status ==
        3 ? '' : item?.companyAddress }}
              </view>
            </view>
          </view>
          <view class="py-1" v-if="item?.tags && item?.tags.length > 0">
            <uni-collapse ref="collapse">
              <uni-collapse-item titleBorder="none" :border="false" :open="false">

                <template v-slot:title>
                  <view class=" flex">
                    <view v-for="(item1, index) in item?.tags" :key="index"
                      class="text-xs border-solid border-repeat-79 border-[1rpx] rounded-md m-1 px-1 py-0.5 w-22.5 text-center">
                      {{ item1 }}
                    </view>
                  </view>
                </template>
                <view class=" flex flex-wrap" style="width: calc(100% - 40rpx)">
                  <view v-for="(item1, index) in item?.tags" :key="index">
                    <view v-if="index >= 3"
                      class="text-xs border-solid border-repeat-79 border-[1rpx] rounded-md m-1 px-1 py-0.5 w-22.5 text-center">
                      {{ item1 }}
                    </view>
                  </view>
                </view>
              </uni-collapse-item>
            </uni-collapse>
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

<script setup lang="ts">
import SearchBar from '@/components/searchBar/index.vue';
import OdList from '@/components/list/index.vue';
import SliderTab from '@/components/sliderTab/index.vue';
import { ref, computed } from 'vue';
import * as status from '@/api/app/status'
import { onLoad } from '@dcloudio/uni-app';
import { useMemberStore } from '@/stores'

let memberStore = useMemberStore()

const toDetail = (id: number) => { uni.navigateTo({ url: '/pages/member/detail/index?id=' + id }); }

let option = ref(4);
let i = ref(0)
let options = ['会员', '嘉宾', '顾问团'];
const check = (index: number) => {
  i.value = index
  if (index == 0) {
    if (option.value != 4) {
      page.value = 1
      list.value = []
      recordTotal.value = 0
      total.value = 0
      option.value = 4
      loadData()
    } else {
      option.value = 4;
    }
  } else if (index == 1) {
    if (option.value != 3) {
      page.value = 1
      list.value = []
      recordTotal.value = 0
      total.value = 0
      option.value = 3
      loadData()
    } else {
      option.value = 3
    }
  } else {
    if (option.value != 5) {
      page.value = 1
      list.value = []
      recordTotal.value = 0
      total.value = 0
      option.value = 5
      loadData()
    } else {
      option.value = 5
    }
  }

}

const searchKey = ref('')
const search = (e: any) => {
  searchKey.value = e
  page.value = 1
  list.value = []
  recordTotal.value = 0
  total.value = 0
  loadData()
}

const onChange = (e: any) => {
  // console.log('change事件:', e);
  page.value = 1
  list.value = []
  recordTotal.value = 0
  total.value = 0
  loadData()
}

let page = ref(1)
let list: any = ref([])
let recordTotal = ref(0)
let total = ref(0)
const more = computed(() => {
  return list.value.length < recordTotal.value;
});

const lowerBottom = () => {
  page.value++
  loadData()
}

const loadData = async () => {
  const { data } = await status.page_22({ rudeName: searchKey.value, status: option.value, industryId: curValue.value, page: page.value, limit: 10 })
  if (data?.list) {
    list.value = list.value.concat(data?.list)
  }
  recordTotal.value = data?.total || 0
  total.value = data?.list.length || 0
  if (total.value < 10) {
    total.value = 0
  }
}

let curValue = ref(0);
let tabs = ref([
  { key: 0, title: '全部' },
]);


const GetIndustry = async () => {
  const { data } = await status.getIndustry()
  data.map((item: any) => {
    tabs.value.push({ key: item.id, title: item.title })
  })
}


onLoad(() => {
  GetIndustry()
  loadData()
});

</script>

<style lang="scss">
//</style>
