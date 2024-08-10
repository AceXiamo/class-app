<template>
  <view class="flex h-8 w-full flex-row items-center rounded-3xl bg-[#F8F8F8]" @tap="onTap">
    <view class="ml-3 flex items-center">
      <image src="@/static/images/icon-search.png" mode="widthFix" class="w-3.75" />
    </view>
    <view class="w-full ml-1.75">
      <view v-if="!inputAble" class="w-full text-xs">
        {{ placeholder }}
      </view>
      <input v-else v-model="searchKey" class="w-full text-xs" :placeholder="placeholder" placeholder-style="color:#999"
        :focus="autoFocus" @input="onChangeSearch" />
    </view>
    <view class="text-sm w-12 mx-2.5 text-repeat-33" @click="onSearch">
      <text class="text-[#333]">{{ text }}</text>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'SearchBar',
}
</script>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

type TProps = {
  // 搜索按钮文字
  text?: string
  // 是否可输入
  inputAble?: boolean
  // 是否自动聚焦
  autoFocus?: boolean
  // 输入框默认值
  inputValue?: string
  // 输入框placeholder
  placeholder?: string
}
const props = withDefaults(defineProps<TProps>(), {
  text: '搜索',
  inputAble: true,
  autoFocus: false,
  inputValue: '',
  placeholder: '',
})

const placeholder = '请输入' + props.placeholder + '关键词'

const searchKey = ref<string>('')
const emit = defineEmits(['clickSearch', 'search', 'clear'])

onMounted(() => {
  searchKey.value = props.inputValue
})

const onTap = () => {
  emit('clickSearch')
}

const onChangeSearch = () => {
  if (!searchKey.value) {
    emit('clear')
  }
}

const onSearch = () => {
  // console.log(searchKey.value)
  emit('search', searchKey.value)
}

watch(
  () => props.inputValue,
  (val) => {
    if (props.inputValue == '') {
      searchKey.value = ''
    }
    // console.log(props.modelValue)
  },
)
</script>
