<script setup lang="ts">
import { onLaunch, onShow, onHide, onResize } from '@dcloudio/uni-app'
import useApp from '@/utils/uniapp/useApp'

onLaunch(() => {
  useApp().onLaunch()
})
onResize(() => {
  useApp().onResize()
})
onShow(() => {
  useApp().onShow()
})
onHide(() => {
  useApp().onHide()
})
</script>

<style lang="scss">
// 字体图标
@import '@/styles/fonts.scss';

@import '@/styles/common.scss';

page {
  background: #f7f7f7;
}
</style>
