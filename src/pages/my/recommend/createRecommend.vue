<template>
  <view class="overflow-auto h-full p-4 text-sm space-y-4">
    <view>
      创建一个引荐
    </view>

    <view class="flex items-center">
      <view class="flex-1">引荐给</view>
      <!-- <uni-data-select class="w-40" :clear="false" v-model="value" :localdata="range"
        @change="onChange"></uni-data-select> -->
      <view class="w-40 h-8 flex items-center border-solid border-[1rpx] border-[#e9e9e9] rounded-[8rpx]">
        <searchCombox :candidates="member" :isJSON="true" keyName="name" placeholder="请选择" v-model="value"
          @select="select"> </searchCombox>
      </view>
    </view>

    <view class="flex items-center">
      <view class="flex-1">引荐类型</view>
      <uni-data-select class="w-40" :clear="false" v-model="value1" :localdata="range1"
        @change="onChange1"></uni-data-select>
    </view>

    <view class="flex-1">引荐内容</view>
    <view class="border-solid border-[1rpx] border-repeat-79">
      <textarea v-model="content" :maxlength="-1"></textarea>
    </view>

    <view class="flex justify-end space-x-4">
      <view class="w-28">
        <button class="rounded-[0rpx] bg-white border-solid border-[1rpx] border-repeat-79 text-[24rpx]" @tap="cancel">
          取消
        </button>
      </view>
      <view class="w-28">
        <button class="rounded-[0rpx] bg-white border-solid border-[1rpx] border-repeat-79 text-[24rpx]" @tap="submit">
          确定
        </button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import searchCombox from '@/components/search-combox/search-combox.vue';
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { getMember } from '@/api/app/my'
import { createRecommend } from '@/api/my'
import { onLoad } from '@dcloudio/uni-app';
let value = ref('')

let id = ref(-1)

const select = (e: any) => {
  // console.log(e)
  id.value = e.id
}


let member = ref()

onLoad(async () => {
  const { data } = await getMember()
  member.value = data
})


let value1 = ref(-1)
let range1 = ref([
  { value: 0, text: '内部' },
  { value: 1, text: '外部' },
]);
const onChange1 = (e: any) => {
  // console.log('change事件:', e);
  value1.value = e
}

let content = ref('')

const cancel = () => {
  id.value = -1
  value.value = ''
  value1.value = -1
  content.value = ''
}

const submit = () => {
  if (id.value == -1) {
    uni.showToast({
      title: '请选择引荐人',
      icon: 'none'
    })
    return
  }
  else if (value1.value == -1) {
    uni.showToast({
      title: '请选择引荐类型',
      icon: 'none'
    })
    return
  }
  else if (content.value == '') {
    uni.showToast({
      title: '请填写引荐内容',
      icon: 'none'
    })
    return
  }
  createRecommend({
    recommendedId: id.value,
    type: value1.value,
    recommendContent: content.value
  }).then((res: any) => {
    if (res.code == 0) {
      uni.showToast({
        title: '创建成功',
        icon: 'none'
      })
      cancel()
    }
  })

}

</script>

<style scoped></style>