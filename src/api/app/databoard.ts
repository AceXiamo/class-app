import {
  http
} from '@/utils/http';
/**
 * 数据看板
 */
/**
 * @description 走访榜
 */
interface AppVisitBoardData {
  /**  **/
  queryType ? : any;
}
export const AppVisitBoard = ( data ? : AppVisitBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/visitBoard',
    data
  } );
};
/**
 * @description test接口
 */
export const test_1 = () => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/test',
  } );
};
/**
 * @description 引荐金额榜
 */
interface AppRecommandMoneyBoardData {
  /**  **/
  queryType ? : any;
}
export const AppRecommandMoneyBoard = ( data ? : AppRecommandMoneyBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/recommandMoenyBoard',
    data
  } );
};
/**
 * @description 引荐榜
 */
interface AppRecommandBoardData {
  /**  **/
  queryType ? : any;
}
export const AppRecommandBoard = ( data ? : AppRecommandBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/recommandBoard',
    data
  } );
};
/**
 * @description 全勤榜
 */
interface getPresentPersonData {
  /**  **/
  averageYear ? : any;
  /**  **/
  averageMonth ? : any;
}
export const getPresentPerson = ( data ? : getPresentPersonData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/presentBoard',
    data
  } );
};
/**
 * @description 功勋会员榜
 */
interface AppInvitePersonBoardData {
  /**  **/
  averageYear ? : any;
  /**  **/
  averageMonth ? : any;
}
export const AppInvitePersonBoard = ( data ? : AppInvitePersonBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/invitePersonBoard',
    data
  } );
};
/**
 * @description 邀请嘉宾榜
 */
interface AppInviteGuestBoardData {
  /**  **/
  queryType ? : any;
}
export const AppInviteGuestBoard = ( data ? : AppInviteGuestBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/inviteGuestBoard',
    data
  } );
};
/**
 * @description 荣誉榜
 */
interface AppHonorBoardData {
  /**  **/
  averageBoardYear ? : any;
  /**  **/
  averageBoardMonth ? : any;
}
export const AppHonorBoard = ( data ? : AppHonorBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/honorBoard',
    data
  } );
};
/**
 * @description 一届含有的年月
 */
interface AppDateBoardData {
  /**  **/
  session ? : any;
}
export const AppDateBoard = ( data ? : AppDateBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/getDateBoard',
    data
  } );
};
/**
 * @description 获得查询届数
 */
export const AppSessionBoard = () => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/getAllSession',
  } );
};
/**
 * @description 得分榜
 */
interface AppAverageBoardData {
  /**  **/
  averageBoardYear ? : any;
  /**  **/
  averageBoardMonth ? : any;
}
export const AppAverageBoard = ( data ? : AppAverageBoardData ) => {
  return http( {
    method: 'GET',
    url: '/app/dataBoard/listVO/averageBoard',
    data
  } );
};