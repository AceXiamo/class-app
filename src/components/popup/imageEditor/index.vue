<template>
  <od-popup v-model="show" :mask-close="false" content-class="absolute left-0 bottom-0 right-0" @close="onClose">
    <image-cropper :src="src" :width="screenWidth" :height="screenHeight" :cut-width="cutWidth" :cut-height="cutHeight"
      :cut-ratio="cutRatio" :keep-ratio="keepRatio" :hide-cropper="true" :reset-cut="true" :image-center="true"
      :cropper-svg-img="cropperSvgImg" @cropped="onCropped" :disableTranslate="false" :disableCtrl="true" :minZoom="1"
      v-if="show" />
    <view class="absolute w-full px-4 bottom-4 ios-bottom flex justify-between items-center">
      <view class="h-8 w-20">
        <button type="default" @tap="onClose">
          <text>
            取消
          </text>
        </button>
      </view>
      <view class="h-8 w-20">
        <button type="primary" @tap="onConfirm">
          <text>
            确定
          </text>
        </button>
      </view>
    </view>
  </od-popup>
</template>

<script lang="ts">
export default {
  name: 'PopupImageEditor',
}
</script>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

import store from '@/utils/uniapp/system';

import OdPopup from '../default/index.vue';
import ImageCropper from '../image-cropper/index.vue';

interface IProps {
  src: string;
  modelValue: boolean;
  cutWidth?: string | number;
  cutHeight?: string | number;
  cutRatio?: number;
  keepRatio?: boolean;
  cropperSvgImg?: string;
  hideCropper?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  cutWidth: '80%',
  cutHeight: undefined,
  cutRatio: 1,
  keepRatio: false,
  cropperSvgImg: undefined,
  hideCropper: false,
});

const emits = defineEmits(['update:modelValue', 'update:src', 'change', 'close']);
const {
  screenWidth,
  screenHeight
} = storeToRefs(store());

const show = ref(props.modelValue);
const result = ref('');
watch(() => props.modelValue, (val) => {
  show.value = val;
});

const onCropped = (imageUrl: string) => {
  result.value = imageUrl;
}

const onClose = () => {
  emits('update:modelValue', false);
  emits('close')
}

const onConfirm = async () => {
  emits('update:src', result.value);
  emits('change', result.value);
  onClose();
}
</script>
