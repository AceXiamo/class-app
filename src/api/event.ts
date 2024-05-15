import {
  http
} from '@/utils/http';
/**
 * @description 活动报名接口
 */

export const enroll = (eventId?: number) => {
  return http({
    method: 'POST',
    url: '/app/event/' + eventId,
  });
};