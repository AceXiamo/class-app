<template>
  <view class="p-4 box-border text-sm h-full space-y-4">
    <template v-if="banners.length > 0 && !!banners[0].target">
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

      <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
        <view><text class="text-[#FF4646]">*</text><text class="font-bold">所在城市：</text></view>
        <input
          v-model="info.homeplace"
          class="h-8 mt-2 text-[#666]"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>

      <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
        <view><text class="text-[#FF4646]">*</text><text class="font-bold">公司/单位：</text></view>
        <input
          v-model="info.company"
          class="h-8 mt-2 text-[#666]"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>

      <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
        <view><text class="text-[#FF4646]">*</text><text class="font-bold">职务：</text></view>
        <input
          v-model="info.position"
          class="h-8 mt-2 text-[#666]"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>

      <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
        <view><text class="font-bold">毕业20年，我想对大家说：</text></view>
        <textarea
          v-model="info.college"
          class="h-[200rpx] mt-2 text-[#666]"
          placeholder="请输入"
          placeholder-class="placeholder"
        />
      </view>

      <view class="mt-4 pb-10 flex">
        <!-- <button class="w-[288rpx] h-[88rpx] rounded-[44rpx] bg-[#F5F5F5]">保存</button> -->
        <button class="w-[288rpx] h-[88rpx] rounded-[44rpx] bg-[#E33531] text-white" @tap="commit">
          提交
        </button>
      </view>
    </template>
    <template v-else>
      <view class="flex justify-center items-center h-full">
        <view class="text-sm text-[#666]">Todo:</view>
      </view>
    </template>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from 'vue'
import upload from '@/components/uploadImage/upload.vue'
import { onLoad } from '@dcloudio/uni-app'
import * as my from '@/api/app/my'
import { setInfo } from '@/api/my'
import * as homeApi from '@/api/app/home'

const societyArr = ref<string[]>([''])
const companyArr = ref<string[]>([''])
const banners = ref<any>([])

const loadBanner = () => {
  homeApi.bannerList_1().then((result1) => {
    banners.value = result1.data || []
  })
}

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
  loadBanner()

  const result = await my.getAllInfo()
  info.value = result.data

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

  setInfo(info.value).then((res) => {
    // console.log(res)
    uni.showToast({
      title: '提交成功，请等待审核',
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
