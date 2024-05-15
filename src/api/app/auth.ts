import {
  http
} from '@/utils/http';
/**
 * app认证管理
 */
/**
 * @description 刷新token
 */
interface refreshData {
  /**  **/
  refreshToken ? : any;
}
export const refresh = ( data ? : refreshData ) => {
  return http( {
    method: 'POST',
    url: '/app/auth/refresh',
    data
  } );
};
/**
 * @description 退出登录
 */
export const logout_1 = () => {
  return http( {
    method: 'POST',
    url: '/app/auth/logout',
  } );
};
/**
 * @description 小程序登录
 */
export const login_1 = ( data ? : any ) => {
  return http( {
    method: 'POST',
    url: '/app/auth/login',
    data
  } );
};