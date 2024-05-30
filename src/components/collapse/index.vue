<template>
  <uni-collapse ref="collapse">
    <uni-collapse-item titleBorder="none" :border="false" :open="false">
      <template v-slot:title>
        <view
          :style="{
            width: `${width}rpx`,
            height: `${height + my * 2}rpx`,
          }"
          class="flex flex-wrap overflow-hidden"
        >
          <view
            v-for="(item, index) in dataSource"
            :key="index"
            :style="{
              paddingLeft: `${px}rpx`,
              paddingRight: `${px}rpx`,
              marginTop: `${my}rpx`,
              marginBottom: `${my}rpx`,
              height: `${height}rpx`,
              color: `${textColor}`,
              borderRadius: `${borderRadius}rpx`,
              borderColor: `${borderColor}`,
              borderWidth: `${borderWidth}rpx`,
              fontSize: `${fontSize}rpx`,
              marginRight: `${marginRight}rpx`,
              background: `${bgColor}`,
            }"
            class="border-solid flex items-center justify-center"
          >
            {{ item }}
          </view>
        </view>
      </template>
      <view :style="{ width: `${width}rpx` }" class="overflow-hidden">
        <view
          :style="{
            marginTop: `${-(height + my - 2)}rpx`,
          }"
          class="flex flex-wrap w-full"
        >
          <view v-for="(item, index) in dataSource" :key="index">
            <view
              :style="{
                paddingLeft: `${px}rpx`,
                paddingRight: `${px}rpx`,
                marginBottom: `${my}rpx`,
                height: `${height}rpx`,
                color: `${textColor}`,
                borderRadius: `${borderRadius}rpx`,
                borderColor: `${borderColor}`,
                borderWidth: `${borderWidth}rpx`,
                fontSize: `${fontSize}rpx`,
                marginRight: `${marginRight}rpx`,
                background: `${bgColor}`,
              }"
              class="border-solid flex items-center justify-center"
            >
              {{ item }}
            </view>
          </view>
        </view>
      </view>
    </uni-collapse-item>
  </uni-collapse>
</template>

<script lang="ts">
export default {
  name: 'Collapse',
}
</script>

<script lang="ts" setup>
type TProps = {
  // 宽度，单位rpx
  width?: number
  // item  x内边距，单位rpx
  px?: number
  //上下边距
  my?: number
  //高度
  height?: number
  //文字颜色
  textColor?: string
  //边框色
  borderColor?: string
  //圆角
  borderRadius?: number
  //边框大小，单位rpx
  borderWidth?: number
  //字体大小
  fontSize?: number
  //右边距
  marginRight?: number
  // 数据源，数组类型，数组元素为字符串类型，长度为20个元素，每个元素为字符串类型，字符串长度为20个字符。例如：['1', '2', '3', ..., '20']。数组元素可以为空字符串。
  dataSource?: Array<any>
  //背景色
  bgColor?: string
}
const props = withDefaults(defineProps<TProps>(), {
  width: 600,
  px: 8,
  my: 8,
  height: 42,
  textColor: 'white',
  borderColor: 'white',
  borderRadius: 9999,
  borderWidth: 1,
  fontSize: 24,
  marginRight: 18,
  dataSource: [],
  bgColor: 'rgba(255, 255, 255, 0)', // 默认背景色为透明色，不显示背景色。如果需要显示背景色，请根据实际需求修改。
})
</script>

<style lang="scss" scoped>
//再使用该组件的页面添加一下样式，否则背景色默认白色
// ::v-deep .uni-collapse-item__wrap {
//   background-color: rgba(255, 255, 255, 0);
// }
// ::v-deep .uni-collapse {
//   background-color: rgba(255, 255, 255, 0);
// }
</style>
