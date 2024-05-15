import { http } from '@/utils/http'

/**
 * @description 创建引荐
 */
interface CreateRecommend {
    recommendedId: number,
    type: number,
    recommendContent: string
}
export const createRecommend = (data?: CreateRecommend) => {
    return http({
        method: 'POST',
        url: '/app/my/recommend',
        data
    });
};

/**
 * @description 录入点对点走访接口
 */
interface CreateVisit {
    visitedId: number,
    content: string,
    comment: string,
    status: number
}
export const createVisit = (data?: CreateVisit) => {
    return http({
        method: 'POST',
        url: '/app/my/visit',
        data
    });
};

/**
 * @description 添加/修改基本个人信息接口
 */
interface Info {
    avatar: string,
    name: string,
    sex: number,
    homeplace: string,
    college: string,
    industry: string,
    industryType: string,
    company: string,
    position: string,
    companyAddress: string,
    bussiness: string,
    advantage: string,
    resourcesNeed: string,
    resourcesProvide: string,
    hobby: string,
    recommenderId: number,
    mobile: string,
    wechatQrCode: string,
}
export const setInfo = (data?: Info) => {
    return http({
        method: 'POST',
        url: '/app/my/info',
        data
    });
};