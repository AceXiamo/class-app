import {
  http
} from '@/utils/http';
/**
 * app组织资讯
 */
/**
 * @description 组织资讯页列表分页查询
 */
interface page_23Data {
  /** 当前页码 **/
  page ? : any;
  /** 每页条数 **/
  limit ? : any;
  /** 排序字段 **/
  order: any;
  /** 是否升序 **/
  asc: any;
}
export const page_23 = ( data ? : page_23Data ) => {
  return http( {
    method: 'GET',
    url: '/app/news',
    data
  } );
};
/**
 * @description 资讯详细内容查询
 */
interface getContentData {
  /**  **/
  id ? : any;
}
export const getContent = ( data ? : getContentData ) => {
  return http( {
    method: 'GET',
    url: '/app/news/' + data?.id + '',
  } );
};