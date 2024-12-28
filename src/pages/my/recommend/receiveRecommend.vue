<template>
  <view class="overflow-auto h-full p-4 text-sm space-y-4">
    <view class="rounded-[16rpx] bg-white w-full pb-4">
      <view
        class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative"
      >
        <view class="w-0.75 h-[28rpx] bg-[#E33531] mr-2"></view>
        <view class="text-base font-bold">我收到的引荐</view>
        <view class="w-[108rpx] h-[42rpx] rounded-full absolute right-[30rpx]">
          <uni-data-select
            class="w-16"
            :clear="false"
            v-model="value"
            :localdata="range"
            @change="onChange"
          ></uni-data-select>
        </view>
      </view>
      <view class="flex pt-4 pb-4">
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">引荐数</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            receiveRecommend?.recommendNum
          }}</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">成交金额</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            receiveRecommend?.recommendAmount
          }}</view>
        </view>
      </view>
      <view class="flex pt-4 pb-4">
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">内部引荐数</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            receiveRecommend?.innerRecommendNum
          }}</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">内部引荐成交金额</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            receiveRecommend?.innerRecommendAmount
          }}</view>
        </view>
      </view>
      <view class="flex pt-4 pb-4">
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">外部引荐数</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            receiveRecommend?.outRecommendNum
          }}</view>
        </view>
        <view class="flex-1 text-center">
          <view class="text-[#333] text-[30rpx] mb-1">外部引荐成交金额</view>
          <view class="text-[#E33531] text-[40rpx] font-bold">{{
            receiveRecommend?.outerRecommendAmount
          }}</view>
        </view>
      </view>
    </view>

    <view class="rounded-[16rpx] bg-white w-full overflow-hidden mt-[30rpx]">
      <view
        class="flex items-center h-[112rpx] border-0 border-solid border-b-[2rpx] border-[#F8F8F8] relative"
      >
        <view class="w-0.75 h-[28rpx] bg-[#E33531] mr-2"></view>
        <view class="text-base font-bold">引荐列表</view>
      </view>
      <view>
        <view class="flex text-center mt-[30rpx] mb-[14rpx] leading-[44rpx] font-bold pr-6">
          <view class="flex-1">日期</view>
          <view class="flex-1">引荐人</view>
          <view class="flex-1">类型</view>
          <view class="flex-1">成交金额</view>
        </view>

        <block v-if="receiveRecommendList.length">
          <uni-collapse ref="collapse">
            <uni-collapse-item
              v-for="(item, index) in receiveRecommendList"
              :key="index"
              titleBorder="none"
              :border="false"
              :open="false"
            >
              <template v-slot:title>
                <view class="flex text-center items-center text-[#333] leading-[44rpx] pt-3 pb-3">
                  <view class="flex-1">{{ formatDate(item?.recommendTime) }}</view>
                  <view class="flex-1">{{ item?.recommenderName }}</view>
                  <view class="flex-1">{{ item?.type == 0 ? '内部' : '外部' }}</view>
                  <template v-if="item?.dealAmout > 0">
                    <view class="flex-1">{{ item.dealAmout }}</view>
                  </template>
                  <template v-else>
                    <view
                      @click.stop="openPopup(item?.id)"
                      class="flex-1 border-solid border-[1rpx] border-[#AFAFAF] rounded-[54rpx] py-0.5 border-repeat-79"
                    >
                      创建感谢函
                    </view>
                  </template>
                </view>
              </template>
              <view class="mx-4 mt-1 p-1 flex flex-col text-[#999]">
                <view v-if="item?.recommendContent"> 引荐内容：{{ item?.recommendContent }} </view>
                <view v-if="item?.dealTime"> 成交日期：{{ formatDate(item?.dealTime) }} </view>
                <view v-if="item?.dealContent"> 成交内容：{{ item?.dealContent }} </view>
              </view>
            </uni-collapse-item>
          </uni-collapse>
        </block>
        <view v-else class="text-center text-[#999] text-xs py-2">暂无信息</view>
      </view>
    </view>
  </view>

  <view>
    <uni-popup :isMaskClick="false" ref="getContactInformation">
      <view class="bg-white p-4 space-y-4 text-sm">
        <view class="relative">
          <view class="text-[40rpx] leading-[92rpx] font-bold">创建感谢函</view>
          <view @tap="closePopup" class="absolute right-0 top-0 text-xl">×</view>
        </view>

        <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
          <view class="font-bold">成交金额</view>
          <input
            v-model="amount"
            type="number"
            class="h-8 mt-2 text-[#666]"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
        </view>

        <view class="pb-3 border-b-[1rpx] border-[#F0F0F0]">
          <view class="mb-4 font-bold">成交内容</view>
          <textarea
            v-model="content"
            :maxlength="-1"
            class="w-full text-[#666]"
            auto-height
            placeholder="请输入"
            placeholder-class="placeholder"
          >
          </textarea>
        </view>

        <view class="pb-3 border-b-[1rpx] border-[#F0F0F0]">
          <view class="mb-4 font-bold">感谢语</view>
          <textarea
            v-model="textValue"
            :maxlength="-1"
            class="w-full text-[#666]"
            auto-height
            placeholder="请输入"
            placeholder-class="placeholder"
          >
          </textarea>
        </view>

        <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
          <view class="font-bold">是否已在群里发感谢函</view>
          <!-- <uni-data-select class="w-16" :clear="false" v-model="value1" :localdata="range1"
            @change="onChange1"></uni-data-select> -->
          <radio-group class="h-8 mt-2 ml-2 flex items-center" @change="onChange1">
            <label class="flex-1" v-for="(item, index) in range1" :key="item.value">
              <radio :value="item.value + ''" color="#E33531" />
              <text class="ml-1 text-[#666]">{{ item.text }}</text>
            </label>
          </radio-group>
        </view>

        <view class="flex justify-end">
          <view class="w-20">
            <button class="rounded-3xl bg-[#E33531] text-white text-[24rpx]" @tap="submit">
              提交
            </button>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from 'vue'
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
import { getCurrentInstance } from 'vue'
import { getReceiveRecommendList, getReceiveRecommend, createComment } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app'
import { formatDate } from '@/utils/tools'

let value = ref(0)
let range = ref([
  { value: 0, text: '本周' },
  { value: 1, text: '本月' },
  { value: 2, text: '本届' },
  { value: 3, text: '累计' },
])

let receiveRecommend = ref()
let receiveRecommendList = ref()
onLoad(() => {
  loadData()
})

const loadData = async () => {
  const recommend = await getReceiveRecommend({ queryType: value.value })
  receiveRecommend.value = recommend.data
  const recommendList = await getReceiveRecommendList({ queryType: value.value })
  receiveRecommendList.value = recommendList.data
}

const onChange = async (e: any) => {
  // console.log('change事件:', e);
  loadData()
}

let value1 = ref(0)
let range1 = ref([
  { value: 0, text: '是' },
  { value: 1, text: '否' },
])
const onChange1 = (e: any) => {
  // console.log('change1事件:', e);
  value1.value = e.detail.value * 1
}

const _this = getCurrentInstance()
let amount = ref('')
let content = ref('')
let textValue = ref('')
const submit = () => {
  console.log('submit', amount.value, content.value, textValue.value)
  createComment({
    id: commendId.value,
    dealAmout: amount.value,
    dealContent: content.value,
    comment: textValue.value,
    status: value1.value,
  }).then((res) => {
    uni.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 1500,
    })
    closePopup()
    loadData()
  })
}

//控制展开收起
let disabled = ref(false)

let commendId: any = ref()
//弹出弹窗
const openPopup = (id: number) => {
  commendId.value = id
  disabled.value = true
  _this?.refs.getContactInformation.open()
}

//关闭弹窗
const closePopup = () => {
  disabled.value = false
  amount.value = ''
  content.value = ''
  textValue.value = ''
  _this?.refs.getContactInformation.close()
}
</script>

<style lang="scss" scoped>
::v-deep .uni-select {
  border-radius: 9999rpx !important;
  background-color: #fff5f9 !important;
  height: 44rpx !important;
  font-size: 24rpx !important;
  display: flex !important;
  align-items: center !important;
  border: 0 !important;
}

::v-deep .uni-select__input-text {
  color: #e33531 !important;
  text-align: right !important;
}

::v-deep .uni-icons {
  color: #e33531 !important;
  margin: 0 6rpx 0 8rpx !important;
}

::v-deep .uni-collapse-item__title {
  border-bottom: 2rpx solid #f8f8f8;
}

.placeholder {
  color: #afafaf !important;
}
</style>
