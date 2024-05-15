<template>
  <view v-show="modelValue" class="fixed left-0 top-0 right-0 bottom-0 z-9999" :style="{
    'background-color': maskBg
  }" @tap.stop="onTapMask">
    <view :class="contentClass" @tap.stop.prevent="tapMaskInside">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'OdPopup',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import useClassname from '../useClassname';

interface IProp {
  maskBg?: string;
  modelValue: boolean;
  maskClose?: boolean;
  contentClass?: string;
}

const props = withDefaults(defineProps<IProp>(), {
  maskBg: 'rgba(0, 0, 0, 0.5)',
  modelValue: false,
  maskClose: true,
  contentClass: ''
});

const emits = defineEmits(['update:modelValue', 'close']);

const { classList: contentClass } = useClassname(ref(props.contentClass));
const tapMaskInside = (event: MouseEvent) => {
  event.stopPropagation()
};

const onTapMask = () => {
  if (props.maskClose) {
    emits('update:modelValue', false);
    emits('close');
  }
}
</script>
