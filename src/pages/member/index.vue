<template>
  <view class="h-full text-sm overflow-hidden">
    <!-- 搜索框 -->
    <view class="py-2 w-full px-[30rpx] box-border bg-white">
      <search-bar :placeholder="''" @search="search" />
    </view>

    <view class="bg-white h-12.5 flex items-center overflow-x-auto">
      <slider-tab v-model="curValue" :tabs="tabs" @change="onChange">
        <template #="{ active, tab, index }">
          <view
            :class="[
              'text-[30rpx] h-12.5 flex items-center relative justify-center',
              {
                'text-repeat-33': active,
                'text-repeat-66': !active,
                'font-bold': active,
                'ml-6': index == 0,
                'mx-3': index !== tabs.length - 1,
                'ml-3': index == tabs.length - 1,
                'mr-6': index == tabs.length - 1,
              },
            ]"
          >
            {{ tab.title }}
            <view v-if="active" class="bg-[#E33531] w-[30rpx] h-0.75 absolute bottom-2"></view>
          </view>
        </template>
      </slider-tab>
    </view>

    <view class="flex justify-center" style="height: calc(100% - 196rpx)">
      <od-list class="w-full" :total="total" :load-more="more" @on-load-more="lowerBottom">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="m-[30rpx] rounded-[16rpx] bg-white overflow-hidden"
        >
          <view @tap="toDetail(item?.id)" class="flex m-[-1rpx] pt-3 pb-[28rpx] ml-[25rpx]">
            <image
              mode="aspectFit"
              class="w-[180rpx] h-[180rpx] rounded-[8rpx]"
              :src="
                item?.avatar ||
                'https://chambers.oss-cn-shenzhen.aliyuncs.com/20241208/f7c7fd8a-7323-416a-b3db-62eb07118217-WechatIMG163_39398.jpg'
              "
            >
            </image>
            <view class="flex-1 text-xs flex flex-col items-end pr-[30rpx]">
              <view class="font-bold text-[40rpx] text-black h-5.5 flex items-center">
                {{ item?.name }}
              </view>
              <view class="mt-auto flex flex-col gap-[10rpx]">
                <view class="flex items-center justify-end gap-[10rpx]">
                  <uni-icons type="location" size="14" color="#333" class="translate-y-[2rpx]" />
                  <text class="text-[#333] text-[26rpx]">{{ item?.homeplace }}</text>
                </view>
                <view class="flex items-center justify-end">
                  <text class="text-[#333] text-[26rpx]">{{ item?.company }}</text>
                </view>
              </view>
            </view>
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
  uni.showLoading({ title: '加载中' })
  const { data } = await status.page_22({
    rudeName: searchKey.value,
    status: option.value,
    industryId: curValue.value,
    page: page.value,
    limit: 10,
  })
  uni.hideLoading()
  if (data?.list) {
    list.value = list.value.concat(data?.list)
  }
  recordTotal.value = data?.total || 0
  total.value = data?.list.length || 0
  if (total.value < 10) {
    total.value = 0
  }
}

let curValue = ref(4)
let tabs = ref([
  // { key: -1, title: '全部' },
  { key: 4, title: '老师' },
  { key: 3, title: '同学' },
])

const GetIndustry = async () => {
  // const { data } = await status.getIndustry()
  // data.map((item: any) => {
  //   tabs.value.push({ key: item.id, title: item.title })
  // })
}

onLoad(() => {
  GetIndustry()
  loadData()
})

const openLocation = (item: any) => {
  if (item.lat && item.lng && item.companyAddress) {
    uni.openLocation({
      address: item.companyAddress,
      latitude: item.lat,
      longitude: item.lng,
      fail(res) {
        console.log(res)
      },
    })
  }
}
</script>

<style lang="scss">
//
</style>
