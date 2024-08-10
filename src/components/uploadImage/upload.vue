<template>
  <view>
    <view v-if="showButton" class="flex flex-wrap relative" :style="{ width: `${size}rpx`, height: `${size}rpx` }">
      <view v-for="(url, index) in curUrl" :key="`gallery-${index}`"
        class="relative flex items-center justify-center bg-repeat-ef"
        :style="{ width: `${size}rpx`, height: `${size}rpx` }">
        <image class="rounded-[16rpx]" :src="url" mode="scaleToFill"
          :style="{ width: `${size}rpx`, height: `${size}rpx` }" @tap="uploadImage" />
      </view>
      <view v-if="curUrl.length < limit">
        <view @tap="uploadImage">
          <slot>
            <view class="bg-repeat-f5 flex flex-col items-center justify-center rounded-[16rpx]"
              :style="{ width: `${size}rpx`, height: `${size}rpx` }">
              <!-- <view class="font-bold text-base"> + </view> -->
              <uni-icons type="plusempty" :size="size / 4" color="#D8D8D8"
                :style="{ height: `${size / 4}px`, lineHeight: `${size / 4}px` }"></uni-icons>
              <view v-if="title" class="text-xs">{{ title }}</view>
            </view>
          </slot>
        </view>
      </view>
      <image v-else src="@/static/images/img-close.png" class="w-4 h-4 absolute top-[-16rpx] right-[-16rpx]"
        @tap="onDelete()" />
    </view>

    <popup-image-editor v-model="show" v-model:src="src" :cut-width="cutWidth" :cut-height="cutHeight"
      :cut-ratio="cutRatio" :keep-ratio="keepRatio" :cropper-svg-img="cropperSvgImg" :hide-cropper="hideCropper"
      @change="onFinishCropper" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'Upload',
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import PopupImageEditor from '@/components/popup/imageEditor/index.vue'

import * as log from '@/utils/log'
import * as tools from '@/utils/tools'

interface IProps {
  modelValue?: string | string[]
  limit?: number
  cropper?: boolean
  cutWidth?: string | number
  cutHeight?: string | number
  cutRatio?: number
  keepRatio?: boolean
  cropperSvgImg?: string
  hideCropper?: boolean
  showButton?: boolean
  buttonSize?: number | string
  title?: string
  size?: number
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  limit: 1,
  cropper: false,
  cutWidth: '80%',
  cutHeight: undefined,
  cutRatio: 1,
  keepRatio: false,
  cropperSvgImg: undefined,
  hideCropper: false,
  showButton: false,
  buttonSize: 60,
  title: undefined,
  size: 200,
})

const emits = defineEmits(['update:modelValue', 'uploading', 'finish', 'change'])
const cropperEnabled = computed(() => props.cropper === true && props.limit === 1)

const src = ref('')
const fileName = ref('')

const curUrl = ref<string[]>(
  Array.isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : [],
)
watch(
  () => props.modelValue,
  (val) => {
    curUrl.value = Array.isArray(val) ? val : val ? [val] : []
  },
)

const show = ref(false)

const buttonSizeWStr = computed(() => {
  if (typeof props.buttonSize === 'number') {
    return `${props.buttonSize * 2}rpx`
  }
  return props.buttonSize
})

const buttonSizeHStr = computed(() => {
  if (
    props.cutHeight &&
    props.cutWidth &&
    typeof props.cutHeight === 'number' &&
    typeof props.cutWidth === 'number'
  ) {
    const size =
      typeof props.buttonSize === 'number' ? props.buttonSize : parseInt(props.buttonSize, 10)
    return `${(size / props.cutWidth) * props.cutHeight * 2}rpx`
  }
  if (typeof props.buttonSize === 'number') {
    return `${props.buttonSize * 2}rpx`
  }
  return props.buttonSize
})

const uploadImage = () => {
  if (props.limit !== -1 && props.limit !== 1 && curUrl.value.length >= props.limit) {
    log.showFail('无法继续上传')
    return
  }
  src.value = ''
  uni.chooseImage({
    count: props.limit,
    // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 从相册选择
    success: (res) => {
      log.log('上传图片', res)
      if (res.tempFilePaths.length > 0) {
        emits('uploading')
        if (cropperEnabled.value) {
          const uploadFile = Array.isArray(res.tempFiles) ? res.tempFiles[0] : res.tempFiles
          fileName.value = 'name' in uploadFile ? uploadFile.name : `${tools.generateCode()}.jpg`
          src.value = res.tempFilePaths[0]
          show.value = true
          return
        }
        const files = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
        // Promise.all(files.map(url => {
        // 	// return apiUpdateImageFile(url)
        // 	let path = ''
        // 	uni.uploadFile({
        // 		url: '/sys/file/upload', // 替换为你的上传接口地址
        // 		filePath: url,
        // 		name: 'file', // 替换为你的上传接口中文件字段的参数名
        // 	}).then((res) => {
        // 		// 处理上传成功的逻辑，例如获取上传后的图片地址等
        // 		path = JSON.parse(res.data).data.urlreturn path
        // 	})
        //     return path
        // })).then(resp => {
        // 	curUrl.value = [];
        // 	curUrl.value.push(...resp);
        // 	onFinish();
        // }).catch(e => {
        // 	emits('finish');
        // 	// utils.log.catchErrorHandler(e);
        // })
      }
    },
    fail: (e) => {
      show.value = false
      emits('finish')
      // utils.log.catchErrorHandler(e);
    },
  })
}

const onFinishCropper = async (imageUrl: string) => {
  // const result = await upload(imageUrl);
  uni
    .uploadFile({
      url: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_UPLOAD_API, // 替换为你的上传接口地址
      filePath: imageUrl,
      name: 'file', // 替换为你的上传接口中文件字段的参数名
    })
    .then((res) => {
      // 处理上传成功的逻辑，例如获取上传后的图片地址等
      log.log('上传成功', res.data)
      curUrl.value = []
      curUrl.value.push(JSON.parse(res.data).data.url)
      onFinish()
    })
}

const onFinish = () => {
  const result = props.limit > 0 ? curUrl.value.splice(0, props.limit) : curUrl.value[0]
  emits('update:modelValue', result[0])
  // emits('change', result[0]);
  emits('finish')
}

const onDelete = () => {
  curUrl.value = []
  emits('update:modelValue', '')
  emits('finish')
}
</script>
