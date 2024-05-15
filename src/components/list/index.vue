<template>
  <scroll-view
    :scroll-top="scrollTop"
    scroll-y="true"
    :scroll-into-view="scrollId"
    :style="{
      height: contentHeight
    }"
    :lower-threshold="100"
    @refresherpulling="emit('onRefresh')"
    @scrolltoupper="emit('upper', $event)"
    @scrolltolower="lower"
    @scroll="emit('scroll', $event)"
  >
    <slot name="header" />
    <slot />
    <slot
      v-if="total === 0"
      name="empty"
    >
      <view class="h-1/2 flex items-center justify-center text-repeat-aa text-sm">
        暂无数据
      </view>
    </slot>
    <slot name="footer" />
    <od-spin
      v-if="loading"
      :full="false"
    />
  </scroll-view>
</template>

<script lang="ts">
export default {
  name: 'OdList'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

interface IProps {
  // 判断数量，如果是0，显示empty的内容
  total: number;
  // 是否展示loading动画
  loading?: boolean;
  // 是否触发加载更多
  loadMore?: boolean;
  // 列表高度
  height?: number|string
  scrollTop?: number
  // 滚动到指定id
  scrollId?: string
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false,
  loadMore: false,
  height: undefined,
  scrollId: '',
  scrollTop: 0
});
const emit = defineEmits(['onRefresh','onLoadMore', 'upper', 'lower', 'scroll']);

const contentHeight = computed(() => {
  if(typeof props.height === 'string') {
    return props.height;
  }
  return props.height === undefined ? '100%' : props.height + 'px';
});

const lower = (e:any) => {
  if(props.loadMore) {
    emit('onLoadMore');
  }
  emit('lower',e)
}
</script>