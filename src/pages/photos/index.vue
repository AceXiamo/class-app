<template>
  <view class="h-full text-sm overflow-hidden relative">
    <view class="flex items-center justify-center w-full bg-red-500" style="height: 300rpx">
      <image src="/static/images/photos/1.png" class="w-full h-full" />
    </view>

    <view class="flex justify-center" style="height: calc(100% - 400rpx)">
      <od-list class="w-full" :total="total" :load-more="more" @on-load-more="lowerBottom">
        <view
          class="grid grid-cols-2 gap-[20rpx]"
          style="grid-template-columns: repeat(2, 1fr); gap: 20rpx"
        >
          <view
            v-for="(item, index) in list"
            :key="index"
            class="m-[30rpx] rounded-[16rpx] bg-red-500 overflow-hidden aspect-square"
          >
          </view>
        </view>
        <template #empty>
          <view class="pt-4 pb-[50rpx] text-xs flex items-center justify-center text-repeat-aa">
            没有更多了
          </view>
        </template>
      </od-list>
    </view>

    <!-- Button 上传回忆相片 -->
    <view
      class="absolute bottom-0 left-0 right-0 h-[100rpx] bg-white flex justify-center items-center"
    >
      <view
        class="bg-blue-500 rounded-md w-max h-max py-[10rpx] px-[20rpx] text-white text-[28rpx]"
      >
        上传回忆相片
      </view>
    </view>
  </view>
</template>

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
