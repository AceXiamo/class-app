<template>
  <view class="overflow-auto p-4 text-sm h-full space-y-4">

    <view>录入一个点对点走访</view>

    <view class="flex items-center">
      <view class="flex-1">被走访人</view>
      <!-- <uni-data-select class="w-40" :clear="false" v-model="value" :localdata="range"
        @change="onChange"></uni-data-select>       -->
      <view class="w-40 h-8 flex items-center border-solid border-[1rpx] border-[#e9e9e9] rounded-[8rpx]">
        <searchCombox :candidates="member" :isJSON="true" keyName="name" placeholder="请选择" v-model="value"
          @select="select"> </searchCombox>
      </view>
    </view>

    <view>走访事由</view>

    <view>
      <input v-model="content" class="h-8 border-solid border-[1rpx] border-repeat-79" />
    </view>


    <view>走访事由</view>

    <view class="border-solid border-[1rpx] border-repeat-79">
      <textarea v-model="textValue" :maxlength="-1">
          </textarea>
    </view>

    <view class="flex items-center">
      <view class="flex-1">是否已在群里宣传被走访人</view>
      <uni-data-select class="w-16" :clear="false" v-model="value1" :localdata="range1"
        @change="onChange1"></uni-data-select>
    </view>

    <view class="flex justify-center space-x-4">
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

// const value = ref(-1)
// const range = ref([
//   { value: 0, text: '郑高强' },
//   { value: 1, text: '郑高强' },
//   { value: 2, text: '郑高强' },
// ]);
// const onChange = (e: any) => {
//   // console.log('change事件:', e);
// }

let value1 = ref(-1);
let range1 = ref([
  { value: 1, text: '是' },
  { value: 0, text: '否' },
]);
const onChange1 = (e: any) => {
  // console.log('change1事件:', e);
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
      cancel()
    }
  })

}
</script>

<style scoped></style>