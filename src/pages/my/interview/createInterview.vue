<template>
  <view class="overflow-auto p-4 box-border text-sm h-full space-y-4">

    <view class="text-[40rpx] leading-[92rpx] font-bold">录入一个点对点走访</view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="text-[#333] font-bold mb-2">被走访人</view>
      <!-- <uni-data-select class="w-40" :clear="false" v-model="value" :localdata="range"
        @change="onChange"></uni-data-select>       -->
      <searchCombox :candidates="member" :isJSON="true" keyName="name" placeholder="请选择" v-model="value"
        @select="select">
      </searchCombox>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="text-[#333] font-bold">走访事由</view>
      <input v-model="content" class="h-8 mt-2 text-[#666]" placeholder="请输入" placeholder-class="placeholder" />
    </view>

    <view class="pb-3 border-b-[1rpx] border-[#F0F0F0]">
      <view class="text-[#333] font-bold mb-4">走访情况</view>
      <textarea v-model="textValue" :maxlength="-1" class="w-full text-[#666]" auto-height placeholder="请输入"
        placeholder-class="placeholder">
          </textarea>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="text-[#333] font-bold">是否已在群里宣传被走访人</view>
      <radio-group class="h-8 mt-2 ml-2 flex items-center" @change="onChange1">
        <label class="flex-1" v-for="(item, index) in range1" :key="item.value">
          <radio :value="item.value" color="#92003F" />
          <text class="ml-1 text-[#666]">{{ item.text }}</text>
        </label>
      </radio-group>
      <!-- <uni-data-select class="" :clear="false" v-model="value1" :localdata="range1" @change="onChange1"></uni-data-select> -->
    </view>

    <view class="flex justify-between pt-[82rpx] px-4">
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
import { onLoad } from '@dcloudio/uni-app';
import { getMember } from '@/api/app/my';
import { createVisit } from '@/api/my';
let member = ref()

onLoad(async () => {
  const { data } = await getMember()
  member.value = data
})

let value = ref('')

let id = ref(-1)

const select = (e: any) => {
  // console.log(e)
  id.value = e.id
}

// const onChange = (e: any) => {
//   // console.log('change事件:', e);
// }

let value1 = ref(-1);
let range1 = ref([
  { value: '1', text: '是' },
  { value: '0', text: '否' },
]);
const onChange1 = (e: any) => {
  value1.value = e.detail.value * 1
}

let content = ref('')
let textValue = ref('')

const cancel = () => {
  value.value = ''
  id.value = -1
  value1.value = -1
  content.value = ''
  textValue.value = ''
}

const submit = () => {
  if (id.value == -1) {
    uni.showToast({
      title: '请选择被走访人',
      icon: 'none'
    })
    return
  }
  else if (content.value == '') {
    uni.showToast({
      title: '请填写走访内容',
      icon: 'none'
    })
    return
  }
  else if (textValue.value == '') {
    uni.showToast({
      title: '请填写走访情况',
      icon: 'none'
    })
    return
  }
  else if (value1.value == -1) {
    uni.showToast({
      title: '请选择是否已在群里宣传被走访人',
      icon: 'none'
    })
    return
  }
  createVisit({
    visitedId: id.value,
    content: content.value,
    comment: textValue.value,
    status: value1.value
  }).then((res: any) => {
    if (res.code == 0) {
      uni.showToast({
        title: '录入成功',
        icon: 'none'
      })
      // cancel()
      setTimeout(() => {
        uni.redirectTo({
          url: '/pages/my/interview/interviewList'
        })
      }, 2000)
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
::v-deep .search-combox .uni-icons {
  color: #AFAFAF !important;
}

::v-deep .search-combox__input {
  font-size: 28rpx !important;
  height: 64rpx !important;
  color: #666 !important;
}

::v-deep .search-combox {
  padding: 0 !important;
}
</style>
