/**
 * 随机生成字符串
 * @returns
 */
export function generateCode() {
  const time = Math.floor(new Date().getTime() / 1000)
  const randomStr = 'xxxxx4xx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return `${time}${randomStr}`
}

/**
 * 转化base64为blob
 * @param dataURI
 * @returns
 */
export function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  // write the ArrayBuffer to a blob, and you're done
  const bb = new Blob([ab], { type: mimeString })
  return URL.createObjectURL(bb)
}

/**
 * 日期转为月份日期格式
 */
export function formatDate(data: any) {
  const date = new Date(data)
  const month = date.getMonth() + 1 // 获取月份，注意月份是从0开始计数的，所以要加1
  const day = date.getDate() // 获取日期

  // 格式化月份和日期，如果小于10则在前面补0
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day

  // 返回格式化后的日期字符串
  return `${formattedMonth}月${formattedDay}日`
}

//获取年月数组
interface Tab {
  key: number
  year: number
  month: number
}

export function getTabs(startDate: Date): Tab[] {
  const currentDate = new Date()
  const tabs: Tab[] = []
  let key = 1

  let currentYear = currentDate.getFullYear()
  let currentMonth = currentDate.getMonth()

  // 添加当前月的年份和月份，其 key 为 1
  tabs.push({ key, year: currentYear % 100, month: currentMonth + 1 })

  // 获取指定时间到当前时间之间的年份和月份
  while (currentYear !== startDate.getFullYear() || currentMonth !== startDate.getMonth()) {
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
    key++
    tabs.unshift({ key, year: currentYear % 100, month: currentMonth + 1 })
  }

  tabs.reverse() // 反转数组，使当前月的 key 为 1，其他月份按时间顺序递增
  return tabs
}

export function dateFormatYearAndMonth(date: string) {
  const currentDate = new Date(date)
  return currentDate.toLocaleString('zh-CN', { year: 'numeric', month: 'numeric' })
}

export function formatNumber(num: number): string {
  if (!num) return '0'
  if (num < 10000) return num.toString()
  const str = num.toString()
  const arr = str.split('')
  let result = ''
  let count = 0

  for (let i = arr.length - 1; i >= 0; i--) {
    if (count % 3 === 0 && count !== 0) {
      result = ',' + result
    }
    result = arr[i] + result
    count++
  }

  return result
}

//yyyy-MM-dd hh:mm:ss转换为yyyy年MM月dd日 hh:mm
export function dateFormat(date: string): string {
  if (!date) return ''
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()

  return `${year}年${month}月${day}日 ${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`
}
