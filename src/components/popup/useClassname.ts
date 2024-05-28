import { computed, type Ref } from 'vue'

/**
 * 通用class处理
 * @param className
 * @returns
 */
const useClassname = (className: Ref<string | string[]>) => {
  const classList = computed(() => {
    if (typeof className.value === 'string') {
      return className.value
    }
    return className.value.join(' ')
  })
  return {
    classList,
  }
}
export default useClassname
