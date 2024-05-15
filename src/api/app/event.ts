import {
  http
} from '@/utils/http';
/**
 * app活动报名
 */
/**
 * @description 活动详情页
 */
interface get_20Data {
  /**  **/
  eventId ? : any;
}
export const get_20 = ( data ? : get_20Data ) => {
  return http( {
    method: 'GET',
    url: '/app/event/' + data?.eventId + '',
  } );
};
/**
 * @description 活动报名页列表分页查询
 */
interface page_24Data {
  /** 当前页码 **/
  page ? : any;
  /** 每页条数 **/
  limit ? : any;
  /** 排序字段 **/
  order: any;
  /** 是否升序 **/
  asc: any;
}
export const page_24 = ( data ? : page_24Data ) => {
  return http( {
    method: 'GET',
    url: '/app/event',
    data
  } );
};
/**
 * @description 已报名活动名单
 */
interface getEnrollData {
  /**  **/
  eventId ? : any;
}
export const getEnroll = ( data ? : getEnrollData ) => {
  return http( {
    method: 'GET',
    url: '/app/event/enroll/' + data?.eventId + '',
  } );
};