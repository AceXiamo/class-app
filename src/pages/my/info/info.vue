<template>
  <view class="p-4 box-border text-sm h-full space-y-4">
    <view class="font-bold">申请加入/修改个人商务信息</view>

    <view class="font-bold">温馨提示：请将下列商务信息填写完整，方便对接商务信息</view>

    <view class="flex items-center">
      <view class="flex-1">*头像</view>
      <upload v-model="info.avatar" :title="'上传头像'" :size="200" :show-button="true" :cropper="true"
        @finish="onFinish" />
    </view>

    <view class="flex items-center">
      <view class="flex-1">*姓名：</view>
      <input v-model="info.name" class="h-8 border-solid border-repeat-79 border-[1rpx] px-1" />
    </view>

    <view class="flex items-center">
      <view class="flex-1">*性别：</view>
      <!-- <input v-model="gender" class="h-8 border-solid border-repeat-79 border-[1rpx] px-1" /> -->
      <uni-data-select class="w-40" :clear="false" v-model="info.sex" :localdata="range"
        @change="onChange"></uni-data-select>
    </view>

    <view class="flex items-center">
      <view class="min-w-max">家乡：省/市/县：</view>
      <input v-model="info.homeplace" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1" />
    </view>

    <view class="flex items-center">
      <view class="min-w-max">大学/年级/专业：</view>
      <input v-model="info.college" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1" />
    </view>

    <view class="flex items-center">
      <view class="min-w-max">*行业：</view>
      <input v-model="info.industry" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1" />
    </view>

    <view class="flex items-center">
      <view class="flex-1">*行业类型：</view>
      <uni-data-select class="w-40" :clear="false" v-model="info.industryType" :localdata="industryTypeList"
        @change="onChange"></uni-data-select>
    </view>

    <view class="flex items-center">
      <view class="min-w-max">*公司：</view>
      <input v-model="info.company" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1" />
    </view>

    <view class="flex items-center">
      <view class="min-w-max">*职务：</view>
      <input v-model="info.position" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1" />
    </view>

    <view class="flex items-center">
      <view class="min-w-max">公司地址：</view>
      <input v-model="info.companyAddress" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1" />
    </view>

    <view class="flex justify-end">
      <view @tap="getLocation" class="border-solid border-repeat-79 border-[1rpx] p-1">选择地址</view>
    </view>

    <view>
      <view class="mb-2">主营：</view>
      <view class="border-solid border-[1rpx] border-repeat-79">
        <textarea v-model="info.bussiness" :maxlength="-1" class="h-12 w-full px-1">
      </textarea>
      </view>
    </view>

    <view>
      <view class="mb-2">公司优势：</view>
      <view class="border-solid border-[1rpx] border-repeat-79">
        <textarea v-model="info.advantage" :maxlength="-1" class="h-12 w-full px-1">
      </textarea>
      </view>
    </view>

    <view>
      <view class="mb-2">需要引荐资源：</view>
      <view class="border-solid border-[1rpx] border-repeat-79">
        <textarea v-model="info.resourcesNeed" :maxlength="-1" class="h-12 w-full px-1">
      </textarea>
      </view>
    </view>

    <view>
      <view class="mb-2">我能提供资源：</view>
      <view class="border-solid border-[1rpx] border-repeat-79">
        <textarea v-model="info.resourcesProvide" :maxlength="-1" class="h-12 w-full px-1">
      </textarea>
      </view>
    </view>

    <view>
      <view class="mb-2">兴趣爱好：</view>
      <view class="border-solid border-[1rpx] border-repeat-79">
        <textarea v-model="info.hobby" :maxlength="-1" class="h-12 w-full px-1">
      </textarea>
      </view>
    </view>

    <view>
      <view class="mb-2">*介绍人（如无会员引荐请选择“平台”）：</view>
      <uni-data-select class="w-full" :clear="false" v-model="info.recommenderId" :localdata="member"
        @change="onChange"></uni-data-select>
    </view>

    <view class="flex items-center flex-col">
      <view class="mb-2 w-full">*手机：</view>
      <input v-model="info.mobile" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1 box-border" />
    </view>

    <view>
      <view class="mb-2">*个人微信二维码：</view>
      <view class="flex justify-center">
        <upload v-model="info.wechatQrCode" :title="'上传二维码'" :size="300" :show-button="true" :cropper="true"
          @finish="onFinish" />
      </view>
    </view>

    <view class="mt-4 pb-10">
      <button class="font-bold rounded-[0rpx] w-full border-repeat-79 border-solid border-[1rpx]" @tap="commit">
        提示
      </button>
    </view>

  </view>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import upload from '@/components/uploadImage/upload.vue';
import { onLoad } from '@dcloudio/uni-app';
import * as my from '@/api/app/my'
import { setInfo } from '@/api/my'

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
  wechatQrCode: ''
})
let member: any = ref()
let industryTypeList: any = ref()
onLoad(async () => {
  const result = await my.getAllInfo()
  info.value = result.data

  const { data } = await my.getMember()
  member.value = data.map((item: any) => ({
    value: item.id,
    text: item.name
  }));
  const rec = member.value.find((item: any) => item.text == info.value.recommender)
  if (rec) {
    info.value.recommenderId = rec.value
  }

  const result1 = await my.getIndustryTypeList()
  industryTypeList.value = result1.data.map((item: any) => ({
    value: item.id,
    text: item.title
  }));
})


let range = ref([
  { value: 0, text: '男' },
  { value: 1, text: '女' },
]);

const onChange = (e: any) => {
  // console.log('change事件:', e);
}



const getLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      info.value.companyAddress = res.address
    }
  })
}

const commit = () => {
  console.log(info.value)
  if (info.value.avatar == '' || info.value.avatar == null) {
    uni.showToast({
      title: '请上传头像',
      icon: 'none'
    })
    return
  } else if (info.value.name == '' || info.value.name == null) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none'
    })
    return
  } else if (info.value.sex == -1 || info.value.sex == null) {
    uni.showToast({
      title: '请选择性别',
      icon: 'none'
    })
    return
  } else if (info.value.industry == '' || info.value.industry == null) {
    uni.showToast({
      title: '请填写行业',
      icon: 'none'
    })
    return
  } else if (info.value.industryType == -1 || info.value.industryType == null) {
    uni.showToast({
      title: '请选择行业类型',
      icon: 'none'
    })
    return
  } else if (info.value.company == '' || info.value.company == null) {
    uni.showToast({
      title: '请填写公司',
      icon: 'none'
    })
    return
  } else if (info.value.position == '' || info.value.position == null) {
    uni.showToast({
      title: '请填写职务',
      icon: 'none'
    })
    return
  } else if (info.value.recommenderId == -1 || info.value.recommenderId == null) {
    uni.showToast({
      title: '请选择介绍人',
      icon: 'none'
    })
    return
  } else if (info.value.mobile == '' || info.value.mobile == null) {
    uni.showToast({
      title: '请填写手机',
      icon: 'none'
    })
    return
  } else if (info.value.wechatQrCode == '' || info.value.wechatQrCode == null) {
    uni.showToast({
      title: '请上传二维码',
      icon: 'none'
    })
    return
  }

  setInfo(info.value).then(res => {
    // console.log(res)
    uni.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 1000
    })

    // 返回上一页
    setTimeout(() => {
      uni.navigateBack({
        delta: 1
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

<style scoped></style>