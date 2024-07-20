<template>
  <view class="overflow-auto h-full p-4 text-sm">
    <view class="text-[40rpx] leading-[92rpx]">
      创建一个引荐
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0] mt-3">
      <view class="text-[#333] mb-1">引荐给</view>
      <!-- <uni-data-select class="w-40" :clear="false" v-model="value" :localdata="range"
        @change="onChange"></uni-data-select>       -->
      <searchCombox :candidates="member" :isJSON="true" keyName="name" placeholder="请选择" v-model="value" @select="select">
      </searchCombox>
    </view>

    <view class="border-b-[1rpx] border-[#F0F0F0] mt-3">
      <view class="text-[#333]">引荐类型</view>
      <uni-data-select class="w-40" :clear="false" v-model="value1" :localdata="range1"
        @change="onChange1"></uni-data-select>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0] mt-3">
      <view class="text-[#333] mb-1">引荐内容</view>
      <textarea v-model="content" :maxlength="-1" class="w-full mt-1" auto-height placeholder="请输入"
        placeholder-class="placeholder"></textarea>
    </view>

    <view class="flex justify-between mt-[106rpx] p-4">
      <view class="w-[288rpx] h-[88rpx]">
        <button class="rounded-[44rpx] bg-[#F5F5F5] text-[32rpx] leading-[88rpx]" @tap="cancel">
          取消
        </button>
      </view>
      <view class="w-[288rpx] h-[88rpx]">
        <button class="rounded-[44rpx] bg-[#92003F] text-white text-[32rpx] leading-[88rpx]" @tap="submit">
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

<style lang="scss">
page {
  background: #fff;
}

.placeholder,
::v-deep .search-combox__input-plac,
::v-deep .search-combox .uni-icons,
::v-deep .uni-select__input-placeholder,
::v-deep .uni-select .uni-icons {
  color: #AFAFAF !important;
}

::v-deep .search-combox {
  padding: 0 !important;
}

::v-deep .uni-select {
  border: 0 !important;
  padding: 0 !important;
}

::v-deep .uni-select__input-text {
  font-size: 28rpx !important;
}
</style>