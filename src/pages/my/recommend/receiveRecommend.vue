<template>
  <view class="overflow-auto h-full p-4 text-sm space-y-4">

    <view>我收到的引荐</view>

    <view class="border-solid border-[1rpx] border-repeat-79 p-2 space-y-2">
      <view class="flex justify-end">
        <uni-data-select class="w-16" :clear="false" v-model="value" :localdata="range"
          @change="onChange"></uni-data-select>
      </view>
      <view class="flex">
        <view class="w-2/5">引荐数：{{ receiveRecommend?.recommendNum }}</view>
        <view class="w-3/5">成交金额：{{ receiveRecommend?.recommendAmount }}</view>
      </view>
      <view class="flex">
        <view class="w-2/5">内部引荐数：{{ receiveRecommend?.innerRecommendNum }}</view>
        <view class="w-3/5">内部引荐成交金额：{{ receiveRecommend?.innerRecommendAmount }}</view>
      </view>
      <view class="flex">
        <view class="w-2/5">外部引荐数：{{ receiveRecommend?.outRecommendNum }}</view>
        <view class="w-3/5">外部引荐成交金额：{{ receiveRecommend?.outerRecommendAmount }}</view>
      </view>
    </view>

    <view>引荐列表</view>

    <view>
      <view class="flex mr-6 text-center mb-2">
        <view class="flex-1">日期</view>
        <view class="flex-1">引荐人</view>
        <view class="flex-1">类型</view>
        <view class="flex-1">成交金额</view>
      </view>

      <view class="mr-[-8rpx]">
        <uni-collapse ref="collapse">
          <uni-collapse-item :disabled="disabled" class="py-2" v-for="(item, index) in receiveRecommendList"
            :key="index" titleBorder="none" :border="false" :open="false">
            <template v-slot:title>
              <view class="flex text-center items-center">
                <view class="flex-1">{{ formatDate(item?.recommendTime) }}</view>
                <view class="flex-1">{{ item?.recommenderName }}</view>
                <view class="flex-1">{{ item?.type == 0 ? '内部' : '外部' }}</view>
                <view v-if="item?.dealAmout != 0" class="flex-1">{{ item.dealAmout }}</view>
                <view v-else @tap="openPopup(item?.recommendedId)"
                  class="flex-1 border-solid border-[1rpx] py-0.5 border-repeat-79">
                  创建感谢函
                </view>
              </view>
            </template>
            <view class="mx-2 mt-1 p-1 flex flex-col border-solid border-t-[1rpx] border-repeat-79">
              <view v-if="item?.recommendContent">
                引荐内容：{{ item?.recommendContent }}
              </view>
              <view v-if="item?.dealTime">
                成交日期：{{ formatDate(item?.dealTime) }}
              </view>
              <view v-if="item?.dealContent">
                成交内容：{{ item?.dealContent }}
              </view>
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
    </view>

  </view>

  <view>
    <uni-popup :isMaskClick="false" ref="getContactInformation">
      <view class="bg-white p-4 space-y-4">
        <view class="relative">创建感谢函<view @tap="closePopup" class="absolute right-0 bottom-0 text-xl">×</view>
        </view>

        <view class="flex">
          <view class="flex-1">成交金额</view>
          <input v-model="amount" type="number" class="h-8 border-solid border-[1rpx] border-repeat-79" />
        </view>

        <view class="flex-1">成交内容</view>
        <view class="border-solid border-[1rpx] border-repeat-79">
          <textarea v-model="content" :maxlength="-1">
        </textarea>
        </view>

        <view class="flex-1">感谢语</view>
        <view class="border-solid border-[1rpx] border-repeat-79">
          <textarea v-model="textValue" :maxlength="-1">
        </textarea>
        </view>

        <view class="flex items-center">
          <view class="flex-1">是否已在群里发感谢函</view>
          <uni-data-select class="w-16" :clear="false" v-model="value1" :localdata="range1"
            @change="onChange1"></uni-data-select>
        </view>

        <view class="flex justify-end">
          <view class="w-20">
            <button class="rounded-[0rpx] bg-white border-solid border-[1rpx] border-repeat-79 text-[24rpx]"
              @tap="submit">
              提交
            </button>
          </view>
        </view>
      </view>
    </uni-popup>

  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue';
import { getCurrentInstance } from 'vue';
import { getReceiveRecommendList, getReceiveRecommend, createComment } from '@/api/app/my'
import { onLoad } from '@dcloudio/uni-app';
import { formatDate } from '@/utils/tools';


let value = ref(0);
let range = ref([
  { value: 0, text: '本周' },
  { value: 1, text: '本月' },
  { value: 2, text: '本届' },
  { value: 3, text: '累计' },
]);

let receiveRecommend = ref()
let receiveRecommendList = ref()
onLoad(async () => {
  const recommend = await getReceiveRecommend({ queryType: value.value })
  receiveRecommend.value = recommend.data
  const recommendList = await getReceiveRecommendList({ queryType: value.value })
  receiveRecommendList.value = recommendList.data
})

const onChange = async (e: any) => {
  // console.log('change事件:', e);
  const recommend = await getReceiveRecommend({ queryType: e })
  receiveRecommendList.value = recommend.data
  const recommendList = await getReceiveRecommendList({ queryType: e })
  receiveRecommendList.value = recommendList.data
}

let value1 = ref(0);
let range1 = ref([
  { value: 0, text: '是' },
  { value: 1, text: '否' },
]);
const onChange1 = (e: any) => {
  // console.log('change1事件:', e);
}

const _this = getCurrentInstance()
let amount = ref('')
let content = ref('')
let textValue = ref('')
const submit = () => {
  console.log('submit', amount.value, content.value, textValue.value);
  createComment({
    id: recommendedId.value,
    dealAmout: amount.value,
    dealContent: content.value,
    comment: textValue.value,
    status: value1.value
  }).then(res => {
    uni.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 1500
    })
    closePopup()
  })
}

//控制展开收起
let disabled = ref(false);

let recommendedId: any = ref()
//弹出弹窗
const openPopup = (id: number) => {
  recommendedId.value = id
  disabled.value = true;
  _this?.refs.getContactInformation.open()
}

//关闭弹窗
const closePopup = () => {
  disabled.value = false;
  amount.value = ''
  content.value = ''
  textValue.value = ''
  _this?.refs.getContactInformation.close()
}

</script>

<style scoped></style>