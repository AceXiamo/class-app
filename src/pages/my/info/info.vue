<template>
  <view class="p-4 box-border text-sm h-full space-y-4">
    <view class="font-bold text-[40rpx]">申请加入/修改个人商务信息</view>

    <view class="text-[28rpx] text-[#FF982A]">温馨提示：请将下列商务信息填写完整，方便对接商务信息</view>

    <view class="flex items-center pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="flex-1">
        <view><text class="text-[#FF4646]">*</text>头像</view>
        <view class="placeholder mt-1">请上传图片</view>
      </view>
      <upload v-model="info.avatar" :size="96" :show-button="true" :cropper="true" @finish="onFinish" />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text>姓名：</view>
      <input v-model="info.name" class="h-6 mt-1" placeholder="请输入" placeholder-class="placeholder" />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text>性别：</view>
      <!-- <input v-model="gender" class="h-8 border-solid border-repeat-79 border-[1rpx] px-1" /> -->
      <!-- <uni-data-select class="w-40" :clear="false" v-model="info.sex" :localdata="range"
        @change="onChange"></uni-data-select> -->
      <view class="mt-2 ml-2">
        <radio-group class="flex" @change="sexChange">
          <label class="flex-1" v-for="(item, index) in range" :key="item.value">
            <radio :value="item.value + ''" :checked="info.sex == item.value" color="#92003F" />
            <text class="ml-1">{{ item.text }}</text>
          </label>
        </radio-group>
      </view>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="min-w-max">家乡：省/市/县：</view>
      <picker mode="region" @change="regionChange">
        <view class="placeholder mt-1 flex justify-between">
          <text>{{ info.homeplace || '请选择' }}</text>
          <uni-icons type="bottom" size="16" color="#AFAFAF"></uni-icons>
        </view>
      </picker>
      <!-- <input v-model="info.homeplace" class="h-8 border-solid border-repeat-79 border-[1rpx] w-full px-1" /> -->
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view>大学/年级/专业：</view>
      <input v-model="info.college" class="h-6 mt-1" placeholder="请输入" placeholder-class="placeholder" />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text>行业：</view>
      <input v-model="info.industry" class="h-6 mt-1" placeholder="请输入" placeholder-class="placeholder" />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text>行业类型：</view>
      <uni-data-select class="w-full" :border="false" style="border: none;" :clear="false" v-model="info.industryType"
        :localdata="industryTypeList" @change="onChange"></uni-data-select>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text>公司：</view>
      <input v-model="info.company" class="h-6 mt-1" placeholder="请输入" placeholder-class="placeholder" />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text>职务：</view>
      <input v-model="info.position" class="h-6 mt-1" placeholder="请输入" placeholder-class="placeholder" />
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view>公司地址：</view>
      <view class="flex items-center justify-between mt-1">
        <input v-model="info.companyAddress" class="h-6 flex-1" placeholder="请输入" placeholder-class="placeholder" />
        <view @tap="getLocation" class="text-[#92003F]">选择地址</view>
      </view>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="mb-1">主营：</view>
      <textarea v-model="info.bussiness" :maxlength="-1" class="w-full mt-1" auto-height placeholder="请输入"
        placeholder-class="placeholder">
      </textarea>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="mb-1">公司优势：</view>
      <textarea v-model="info.advantage" :maxlength="-1" class="w-full mt-1" auto-height placeholder="请输入"
        placeholder-class="placeholder">
      </textarea>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="mb-1">需要引荐资源：</view>
      <textarea v-model="info.resourcesNeed" :maxlength="-1" class="w-full mt-1" auto-height placeholder="请输入"
        placeholder-class="placeholder">
      </textarea>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="mb-1">我能提供资源：</view>
      <textarea v-model="info.resourcesProvide" :maxlength="-1" class="w-full mt-1" auto-height placeholder="请输入"
        placeholder-class="placeholder">
      </textarea>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="mb-1">兴趣爱好：</view>
      <textarea v-model="info.hobby" :maxlength="-1" class="w-full mt-1" auto-height placeholder="请输入"
        placeholder-class="placeholder">
      </textarea>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view class="mb-2"><text class="text-[#FF4646]">*</text>介绍人（如无会员引荐请选择“平台”）：</view>
      <uni-data-select class="w-full" :clear="false" v-model="info.recommenderId" :localdata="member"
        @change="onChange"></uni-data-select>
    </view>

    <view class="pb-2 border-b-[1rpx] border-[#F0F0F0]">
      <view><text class="text-[#FF4646]">*</text>手机：</view>
      <input type="number" v-model="info.mobile" class="h-6 mt-1" placeholder="请输入" placeholder-class="placeholder" />
    </view>

    <view>
      <view class="mb-4"><text class="text-[#FF4646]">*</text>个人微信二维码：</view>
      <view class="flex justify-center">
        <upload v-model="info.wechatQrCode" :size="96" :show-button="true" :cropper="true" @finish="onFinish" />
      </view>
    </view>

    <view class="mt-4 pb-10 flex">
      <button class="w-[288rpx] h-[88rpx] rounded-[44rpx] bg-[#F5F5F5]">保存</button>
      <button class="w-[288rpx] h-[88rpx] rounded-[44rpx] bg-[#92003F] text-white" @tap="commit">提交</button>
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
      // console.log('位置名称：' + res.name);
      // console.log('详细地址：' + res.address);
      // console.log('纬度：' + res.latitude);
      // console.log('经度：' + res.longitude);
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

<style lang="scss">
page {
  background: #fff;
}

.placeholder,
::v-deep .uni-select__input-placeholder {
  color: #AFAFAF !important;
}

::v-deep .uni-select {
  border: 0 !important;
  padding: 0 !important;

}

::v-deep .uni-select__input-text {
  font-size: 28rpx !important;
}
</style>