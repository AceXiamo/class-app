import {
  http
} from '@/utils/http';
/**
 * app我的页面
 */
/**
 * @description 我的走访列表
 */
interface myVisitData {
  /** 0本周 1本月 2本届 3累计 **/
  queryType ? : any;
}
export const myVisit = ( data ? : myVisitData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/visit',
    data
  } );
};
/**
 * @description 我给出的引荐
 */
interface getMyRecommendData {
  /** 0本周 1本月 2本届 3累计 **/
  queryType ? : any;
}
export const getMyRecommend = ( data ? : getMyRecommendData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/recommend',
    data
  } );
};
/**
 * @description 基本个人信息
 */
export const getInfo_1 = () => {
  return http( {
    method: 'GET',
    url: '/app/my/info',
  } );
};
/**
 * @description 创建感谢函
 */
export const createComment = ( data ? : any ) => {
  return http( {
    method: 'POST',
    url: '/app/my/comment',
    data
  } );
};
/**
 * @description 我给出的引荐列表
 */
interface getMyRecommendListData {
  /** 0本周 1本月 2本届 3累计 **/
  queryType ? : any;
}
export const getMyRecommendList = ( data ? : getMyRecommendListData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/recommend/list',
    data
  } );
};
/**
 * @description 我收到的引荐
 */
interface getReceiveRecommendData {
  /** 0本周 1本月 2本届 3累计 **/
  queryType ? : any;
}
export const getReceiveRecommend = ( data ? : getReceiveRecommendData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/receiverecommend',
    data
  } );
};
/**
 * @description 我收到的引荐列表
 */
interface getReceiveRecommendListData {
  /** 0本周 1本月 2本届 3累计 **/
  queryType ? : any;
}
export const getReceiveRecommendList = ( data ? : getReceiveRecommendListData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/receiverecommend/list',
    data
  } );
};
/**
 * @description 系统通知详情
 */
interface getNoticeData {
  /**  **/
  id ? : any;
}
export const getNotice = ( data ? : getNoticeData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/notice',
    data
  } );
};
/**
 * @description 获取未读通知数
 */
export const getUnreadNoticeCount = () => {
  return http( {
    method: 'GET',
    url: '/app/my/notice/unread',
  } );
};
/**
 * @description 系统通知列表
 */
export const getMyNoticeList = () => {
  return http( {
    method: 'GET',
    url: '/app/my/notice/list',
  } );
};
/**
 * @description 我的数据
 */
export const getMyData = () => {
  return http( {
    method: 'GET',
    url: '/app/my/mydata',
  } );
};
/**
 * @description 获取/搜索所有会员（排除当前登录用户）
 */
interface getMemberData {
  /** 搜索内容为空时查询所有会员 **/
  search: any;
}
export const getMember = ( data ? : getMemberData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/member',
    data
  } );
};
/**
 * @description 获取所有行业类型
 */
export const getIndustryTypeList = () => {
  return http( {
    method: 'GET',
    url: '/app/my/industry/list',
  } );
};
/**
 * @description 我的嘉宾
 */
interface getGuestData {
  /** 0本周 1本月 2本届 3累计 **/
  queryType ? : any;
}
export const getGuest = ( data ? : getGuestData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/guest',
    data
  } );
};
/**
 * @description 获取我参加的活动列表
 */
interface getMyEventListData {
  /** 0本周 1本月 2本届 3累计 **/
  queryType ? : any;
}
export const getMyEventList = ( data ? : getMyEventListData ) => {
  return http( {
    method: 'GET',
    url: '/app/my/event/list',
    data
  } );
};
/**
 * @description 我的出勤情况
 */
export const getAttendance = () => {
  return http( {
    method: 'GET',
    url: '/app/my/attend',
  } );
};
/**
 * @description 获取信息设置页个人信息
 */
export const getAllInfo = () => {
  return http( {
    method: 'GET',
    url: '/app/my/allInfo',
  } );
};