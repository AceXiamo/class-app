import {
  http
} from '@/utils/http';
/**
 * app首页
 */
/**
 * @description 任期数据展示
 */
interface sessionMoneyData {
  /**  **/
  session ? : any;
}
export const sessionMoney = ( data ? : sessionMoneyData ) => {
  return http( {
    method: 'GET',
    url: '/app/home/sessionMoney/list',
    data
  } );
};
/**
 * @description 总数据接口
 */
export const rudeDataBoard = () => {
  return http( {
    method: 'GET',
    url: '/app/home/rudeData',
  } );
};
/**
 * @description 获取了解更多展示
 */
export const moreShow_1 = () => {
  return http( {
    method: 'GET',
    url: '/app/home/more/show',
  } );
};
/**
 * @description 领导图的简略图
 */
export const leaderList = () => {
  return http( {
    method: 'GET',
    url: '/app/home/leader',
  } );
};
/**
 * @description 获取领导详细数据图
 */
export const perLeaderList = () => {
  return http( {
    method: 'GET',
    url: '/app/home/leader/per',
  } );
};
/**
 * @description 单月数据展示
 */
interface dateMoneyListData {
  /**  **/
  year ? : any;
  /**  **/
  month ? : any;
}
export const dateMoneyList = ( data ? : dateMoneyListData ) => {
  return http( {
    method: 'GET',
    url: '/app/home/dateMoney/list',
    data
  } );
};
/**
 * @description 轮播图列表
 */
export const bannerList_1 = () => {
  return http( {
    method: 'GET',
    url: '/app/home/banner/list',
  } );
};
/**
 * @description 获取单个轮播图
 */
interface getBanner_1Data {
  /**  **/
  id ? : any;
}
export const getBanner_1 = ( data ? : getBanner_1Data ) => {
  return http( {
    method: 'GET',
    url: '/app/home/banner/get/' + data?.id + '',
  } );
};
/**
 * @description 总数据接口
 */
export const allMoney = () => {
  return http( {
    method: 'GET',
    url: '/app/home/allMoney/list',
  } );
};
/**
 * @description 广告图列表
 */
export const adList_1 = () => {
  return http( {
    method: 'GET',
    url: '/app/home/ad/list',
  } );
};
/**
 * @description 获取单个广告图
 */
interface getAd_1Data {
  /**  **/
  id ? : any;
}
export const getAd_1 = ( data ? : getAd_1Data ) => {
  return http( {
    method: 'GET',
    url: '/app/home/ad/get/' + data?.id + '',
  } );
};
/**
 * @description 获取关于我们展示
 */
export const aboutShow_1 = () => {
  return http( {
    method: 'GET',
    url: '/app/home/about/show',
  } );
};