import {
  http
} from '@/utils/http';
/**
 * app根据用户状态查信息
 */
/**
 * @description 会员嘉宾列表查询
 */
interface page_22Data {
  /** 模糊姓名 **/
  rudeName: any;
  /** 查询用户的状态 **/
  status: any;
  /** 行业类型id **/
  industryId: any;
  /** 当前页码 **/
  page ? : any;
  /** 每页条数 **/
  limit ? : any;
  /** 排序字段 **/
  order: any;
  /** 是否升序 **/
  asc: any;
}
export const page_22 = ( data ? : page_22Data ) => {
  return http( {
    method: 'GET',
    url: '/app/status/personList',
    data
  } );
};
/**
 * @description 得到所有行业数据
 */
export const getIndustry = () => {
  return http( {
    method: 'GET',
    url: '/app/status/industryData',
  } );
};