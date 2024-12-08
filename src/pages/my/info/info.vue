<template>
  <view class="p-4 box-border text-sm h-full space-y-4">
    <view class="flex items-center pb-2 border-b-[1rpx] border-[#F0F0F0] mt-[30rpx]">
      <view class="flex-1">
        <view class="h-6"
          ><text class="text-[#FF4646]">*</text><text class="font-bold">头像：</text></view
        >
        <view class="text-[#666] h-6 mt-1.25" v-if="info.avatar">已上传</view>
        <view class="placeholder h-6 mt-1.25" v-else>请上传图片</view>
      </view>
      <upload
        v-model="info.avatar"
        :size="96"
        :show-button="true"
        :cropper="true"
        @finish="onFinish"
      />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text><text class="font-bold">姓名：</text></view>
      <input
        v-model="info.name"
        class="h-8 mt-2 text-[#666]"
        placeholder="请输入"
        placeholder-class="placeholder"
      />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text><text class="font-bold">手机号：</text></view>
      <input
        v-model="info.mobile"
        class="h-8 mt-2 text-[#666]"
        placeholder="请输入"
        placeholder-class="placeholder"
      />
    </view>

    <!-- <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text><text class="font-bold">性别：</text></view>
      <radio-group class="h-8 mt-2 ml-2 flex items-center" @change="sexChange">
        <label class="flex-1" v-for="item in range" :key="item.value">
          <radio :value="item.value + ''" :checked="info.sex == item.value" color="#92003F" />
          <text class="ml-1 text-[#666]">{{ item.text }}</text>
        </label>
      </radio-group>
    </view> -->

    <view class="pb-2">
      <view class="flex justify-between items-center">
        <text class="font-bold">企业职务：</text>
        <view class="text-blue-500" @click="companyArr.push('')">添加</view>
      </view>
      <view class="flex flex-col gap-[10rpx] w-full mt-2">
        <view
          class="flex items-center gap-[30rpx] w-full"
          v-for="(item, index) in companyArr"
          :key="index"
        >
          <input
            v-model="companyArr[index]"
            class="h-8 text-[#666] flex-auto border-[1rpx] border-solid rounded-[4rpx] border-[#F0F0F0] px-[20rpx]"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
          <view class="text-red-500 text-[24rpx]" @click="companyArr.splice(index, 1)">删除</view>
        </view>
      </view>
    </view>

    <view class="pb-2">
      <view class="flex justify-between items-center">
        <text class="font-bold">社会职务：</text>
        <view class="text-blue-500" @click="societyArr.push('')">添加</view>
      </view>
      <view class="flex flex-col gap-[10rpx] w-full mt-2">
        <view
          class="flex items-center gap-[30rpx] w-full"
          v-for="(item, index) in societyArr"
          :key="index"
        >
          <input
            v-model="societyArr[index]"
            class="h-8 text-[#666] flex-auto border-[1rpx] border-solid rounded-[4rpx] border-[#F0F0F0] px-[20rpx]"
            placeholder="请输入"
            placeholder-class="placeholder"
          />
          <view class="text-red-500 text-[24rpx]" @click="societyArr.splice(index, 1)">删除</view>
        </view>
      </view>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="font-bold">企业简介：</text></view>
      <textarea
        v-model="info.company"
        class="h-[200rpx] mt-2 text-[#666]"
        placeholder="请输入"
        placeholder-class="placeholder"
      />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="font-bold">个人简介：</text></view>
      <textarea
        v-model="info.companyAddress"
        class="h-[200rpx] mt-2 text-[#666]"
        placeholder="请输入"
        placeholder-class="placeholder"
      />
    </view>

    <view class="mt-4 pb-10 flex">
      <!-- <button class="w-[288rpx] h-[88rpx] rounded-[44rpx] bg-[#F5F5F5]">保存</button> -->
      <button class="w-[288rpx] h-[88rpx] rounded-[44rpx] bg-[#92003F] text-white" @tap="commit">
        提交
      </button>
    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from 'vue'
import upload from '@/components/uploadImage/upload.vue'
import { onLoad } from '@dcloudio/uni-app'
import * as my from '@/api/app/my'
import { setInfo } from '@/api/my'

const societyArr = ref<string[]>([''])
const companyArr = ref<string[]>([''])

let info: any = ref({
  avatar: '',
  name: '',
  sex: -1,
  homeplace: '',
  college: '',
  industry: '',
  industryType: -1,
  company: '',
  position: '',
  companyAddress: '',
  bussiness: '',
  advantage: '',
  resourcesNeed: '',
  resourcesProvide: '',
  hobby: '',
  recommender: -1,
  recommenderId: -1,
  mobile: '',
  wechatQrCode: '',
})
let member: any = ref([{ value: 0, text: '平台' }])
let industryTypeList: any = ref()
onLoad(async () => {
  const result = await my.getAllInfo()
  info.value = result.data

  societyArr.value = (info.value.bussiness || '').split(',')
  companyArr.value = (info.value.college || '').split(',')

  const { data } = await my.getMember()
  member.value = member.value.concat(
    data.map((item: any) => ({
      value: item.id,
      text: item.name,
    })),
  )
  const rec = member.value.find((item: any) => item.text == info.value.recommender)
  if (rec) {
    info.value.recommenderId = rec.value
  }

  const result1 = await my.getIndustryTypeList()
  industryTypeList.value = result1.data.map((item: any) => ({
    value: item.id,
    text: item.title,
  }))
})

let range = ref([
  { value: 0, text: '男' },
  { value: 1, text: '女' },
])

const sexChange = (e: any) => {
  info.value.sex = e.detail.value * 1
}

const onChange = (e: any) => {
  // console.log('change事件:', e);
}

const regionChange = (e: any) => {
  info.value.homeplace = e.detail.value.join('/')
}

const getLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      // console.log('位置名称：' + res.name)
      // console.log('详细地址：' + res.address)
      // console.log('纬度：' + res.latitude)
      // console.log('经度：' + res.longitude)
      info.value.companyAddress = res.address
      info.value.lng = res.longitude
      info.value.lat = res.latitude
    },
  })
}

const commit = () => {
  console.log(info.value)
  if (info.value.avatar == '' || info.value.avatar == null) {
    uni.showToast({
      title: '请上传头像',
      icon: 'none',
    })
    return
  } else if (info.value.name == '' || info.value.name == null) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none',
    })
    return
  } else if (info.value.mobile == '' || info.value.mobile == null) {
    uni.showToast({
      title: '请填写手机',
      icon: 'none',
    })
    return
  }

  info.value.bussiness = societyArr.value.join(',')
  info.value.college = companyArr.value.join(',')

  setInfo(info.value).then((res) => {
    // console.log(res)
    uni.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 1000,
    })

    // 返回上一页
    setTimeout(() => {
      uni.navigateBack({
        delta: 1,
      })
    }, 1000)
  })
}

const onFinish = () => {
  // console.log(avatarUrl.value)
  // console.log(name.value)
  // console.log(gender.value)
  // console.log(homeTown.value)
  // console.log(grade.value)
  // console.log(industry.value)
  // console.log(industryType.value)
  // console.log(company.value)
  // console.log(position.value)
  // console.log(mobile.value)
  // console.log(qrCodeUrl.value)
  // console.log(address.value)
  // console.log(companyAddress.value)
  // console.log(business.value)
  // console.log(advantage.value)
  // console.log(resourceNeed.value)
  // console.log(resourceProvide.value)
  // console.log(hobby.value)
  // console.log(recommender.value)
}
</script>

<style lang="scss">
page {
  background: #fff;
}

.placeholder,
::v-deep .uni-select__input-placeholder {
  color: #afafaf !important;
}

::v-deep .uni-select {
  border: 0 !important;
  padding: 0 !important;
}

::v-deep .uni-select__input-text {
  font-size: 28rpx !important;
}
</style>
