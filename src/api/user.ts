import { http } from '@/utils/http'
import type { LoginResult } from '@/types/member'

type LoginWxMinParams = {
  code: string
  encryptedData?: string
  iv?: string
}
/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginWxMinParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/app/auth/login',
    data,
  })
}

export const loginWithCode = (data: LoginWxMinParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/app/auth/loginWithCode',
    data,
  })
}

/**
 *  刷新token
 * @param data 请求参数
 */
interface refreshData {
  /** 刷新令牌 **/
  refreshToken?: any
}
export const refresh = (data?: refreshData) => {
  return http({
    method: 'POST',
    url: '/app/auth/refresh?refreshToken=' + data?.refreshToken,
  })
}
// type LoginParams = {
//   account: string
//   password: string
// }
// /**
//  * 传统登录-用户名+密码
//  * @param data 请求参数
//  */
// export const postLoginAPI = (data: LoginParams) => {
//   return http<LoginResult>({
//     method: 'POST',
//     url: '',
//     data,
//   })
// }
