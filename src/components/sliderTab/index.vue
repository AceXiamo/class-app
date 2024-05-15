<template>
  <scroll-view scroll-x="true" class="w-full whitespace-nowrap" :scroll-with-animation="true"
    :scroll-into-view="scrollId">
    <view v-for="(tab, index) in tabs" :id="`tab-${tab.key}`" :key="tab.key" class="inline-block text-center text-xs"
      @tap="onClickTab(tab, index)">
      <slot :active="curKey === tab.key" :tab="tab" :index="index">
        <view>
          {{ tab.title }}
        </view>
      </slot>
    </view>
  </scroll-view>
</template>

<script lang="ts">
export default {
  name: 'OdSliderTab',
}
</script>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';

export type TSliderTagOption<T> = {
  key: string | number
  title: string
  data?: T
}

interface IProps {
  tabs: TSliderTagOption<any>[];
  modelValue?: string | number;
  offset?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  tabAble: true,
  offset: 3
});
const emits = defineEmits(['update:modelValue', 'change']);


const scrollId = ref('');
const curKey = ref(props.modelValue);
watch(() => props.modelValue, () => {
  curKey.value = props.modelValue;
});

const onClickTab = (tab: TSliderTagOption<any>, index: number) => {
  curKey.value = tab.key;
  nextTick(() => {
    const scrollTab = index > props.offset ? props.tabs[index - props.offset] : props.tabs[0];
    scrollId.value = `tab-${scrollTab.key}`;
  });
  emits('update:modelValue', tab.key);
  emits('change', tab);
}
</script>