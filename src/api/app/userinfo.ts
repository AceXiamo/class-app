import {
  http
} from '@/utils/http';
/**
 * 通过身份来获取用户们的信息
 */
/**
 * @description 获取用户详细信息
 */
interface getDetailInfoData {
  /**  **/
  userId ? : any;
}
export const getDetailInfo = ( data ? : getDetailInfoData ) => {
  return http( {
    method: 'GET',
    url: '/app/userInfo',
    data
  } );
};