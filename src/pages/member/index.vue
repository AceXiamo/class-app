<template>
  <view class="h-full text-sm overflow-hidden">
    <!-- 搜索框 -->
    <view class="py-2 w-full px-[30rpx] box-border bg-white">
      <search-bar :placeholder="''" @search="search" />
    </view>

    <view class="h-12.5 flex justify-between text-xl px-10 font-medium bg-white">
      <view
        @tap="check(index)"
        v-for="(item, index) in options"
        :class="{ 'text-[#92003F]': index === i }"
        :key="index"
        class="flex items-center justify-center w-full"
      >
        <view class="relative flex justify-center px-0.5">
          {{ item }}
          <view
            class="w-full h-1.5 bg-[#92003F] opacity-10 rounded-full absolute bottom-0.5"
            v-if="index === i"
          ></view>
        </view>
      </view>
    </view>

    <view class="bg-white h-12.5 flex items-center">
      <slider-tab v-model="curValue" :tabs="tabs" @change="onChange">
        <template #="{ active, tab, index }">
          <view
            :class="[
              'text-[26rpx] h-12.5 flex items-center text-repeat-66 relative justify-center',
              {
                'text-repeat-33': active,
                'font-bold': active,
                'ml-6': index == 0,
                'mx-3': index !== tabs.length - 1,
                'ml-3': index == tabs.length - 1,
                'mr-6': index == tabs.length - 1,
              },
            ]"
          >
            {{ tab.title }}
            <view v-if="active" class="bg-[#92003F] w-[30rpx] h-0.75 absolute bottom-2"></view>
          </view>
        </template>
      </slider-tab>
    </view>

    <view class="flex justify-center" style="height: calc(100% - 296rpx)">
      <od-list class="w-full" :total="total" :load-more="more" @on-load-more="lowerBottom">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="m-[30rpx] rounded-[16rpx] bg-white overflow-hidden"
        >
          <view @tap="toDetail(item?.id)" class="flex m-[-1rpx] pt-[30rpx] pb-[28rpx]">
            <view class="rounded-[8rpx] relative pl-[28rpx] pr-4.5">
              <image
                mode="aspectFill"
                class="w-[172rpx] h-[172rpx] rounded-[8rpx] bg-black"
                :src="
                  !memberStore.profile ||
                  memberStore.profile?.userInfo?.status == 0 ||
                  memberStore.profile?.userInfo?.status == 1 ||
                  memberStore.profile?.userInfo?.status == 2
                    ? ''
                    : item?.avatar
                "
              >
              </image>
              <view
                v-if="item?.leadership_position && item?.leadership_position != ''"
                class="absolute bottom-0 bg-[rgba(0,0,0,0.5)] rounded-b-[8rpx] w-full h-5 flex items-center justify-center text-white text-xs"
              >
                {{ item?.leadership_position }}
              </view>
            </view>
            <view class="w-full text-xs flex flex-col">
              <view class="font-medium text-[30rpx] text-black h-5.5 flex items-center">
                {{ item?.name }}
              </view>

              <view class="w-full h-5.5 flex items-center mt-1 text-repeat-33 text-[26rpx]">
                <text class="w-full break-all line-clamp-1 pr-[34rpx]">
                  行业：{{ item?.industry }}
                </text>
              </view>

              <view class="w-full flex text-repeat-33 text-[26rpx] h-5.5 items-center">
                <view class="flex-2 break-all line-clamp-1"
                  >{{
                    !memberStore.profile ||
                    memberStore.profile?.userInfo?.status == 0 ||
                    memberStore.profile?.userInfo?.status == 1 ||
                    memberStore.profile?.userInfo?.status == 2
                      ? ''
                      : item?.company
                  }}
                </view>
                <view class="ml-3 flex-1 break-all line-clamp-1"
                  >{{
                    !memberStore.profile ||
                    memberStore.profile?.userInfo?.status == 0 ||
                    memberStore.profile?.userInfo?.status == 1 ||
                    memberStore.profile?.userInfo?.status == 2
                      ? ''
                      : item?.position
                  }}
                </view>
              </view>

              <view
                class="w-full flex items-center relative mt-[6rpx] h-5.5 text-repeat-99 text-xs"
              >
                <text class="w-full break-all line-clamp-1 pr-10">
                  {{
                    !memberStore.profile ||
                    memberStore.profile?.userInfo?.status == 0 ||
                    memberStore.profile?.userInfo?.status == 1 ||
                    memberStore.profile?.userInfo?.status == 2 ||
                    memberStore.profile?.userInfo?.status == 3
                      ? ''
                      : item?.companyAddress
                  }}
                </text>
                <image
                  mode="aspectFill"
                  class="w-[30rpx] h-[30rpx] absolute right-3"
                  src="@/static/images/navigation.png"
                >
                </image>
              </view>
            </view>
          </view>

          <view
            v-if="item?.tags && item?.tags.length > 0"
            class="border-0 border-t-[1rpx] border-solid border-[#F8F8F8] pl-[28rpx]"
          >
            <!-- 折叠组件 -->
            <collapse
              :width="600"
              :px="16"
              :my="20"
              :height="44"
              :textColor="'#FF7A33'"
              :borderColor="'rgba(0,0,0,0)'"
              :borderRadius="9999"
              :borderWidth="1"
              :fontSize="24"
              :marginRight="18"
              :dataSource="item?.tags"
              :bgColor="'#FFEFE1'"
            />
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
import SearchBar from '@/components/searchBar/index.vue'
import OdList from '@/components/list/index.vue'
import SliderTab from '@/components/sliderTab/index.vue'
import { ref, computed } from 'vue'
import * as status from '@/api/app/status'
import { onLoad } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores'
import collapse from '@/components/collapse/index.vue'

let memberStore = useMemberStore()

const toDetail = (id: number) => {
  uni.navigateTo({ url: '/pages/member/detail/index?id=' + id })
}

let option = ref(4)
let i = ref(0)
let options = ['会员', '嘉宾', '顾问团']
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
      option.value = 4
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
  return list.value.length < recordTotal.value
})

const lowerBottom = () => {
  page.value++
  loadData()
}

const loadData = async () => {
  const { data } = await status.page_22({
    rudeName: searchKey.value,
    status: option.value,
    industryId: curValue.value,
    page: page.value,
    limit: 10,
  })
  if (data?.list) {
    list.value = list.value.concat(data?.list)
  }
  recordTotal.value = data?.total || 0
  total.value = data?.list.length || 0
  if (total.value < 10) {
    total.value = 0
  }
}

let curValue = ref(0)
let tabs = ref([{ key: 0, title: '全部' }])

const GetIndustry = async () => {
  const { data } = await status.getIndustry()
  data.map((item: any) => {
    tabs.value.push({ key: item.id, title: item.title })
  })
}

onLoad(() => {
  GetIndustry()
  loadData()
})
</script>

<style lang="scss">
//
</style>
