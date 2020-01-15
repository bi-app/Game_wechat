import request from '@/utils/request'
import { stringify } from 'qs'
const wxPrefix = process.env.NODE_ENV === 'development' ? '/wx' : '';

export interface configType {
  AbsoluteUrl: string
}

export interface paramsType {
  activityId: string
}

export interface shareType {
  activityId: string
  fromOpenid: string
  fromCustId: string
  shareType: string
}

export interface CouponParams {
  CouponState?: number;
  Index: number;
  Size: number;
}

export interface CouponDetailsParams {
  couponCodeId: string;
}



/**初始化appid等信息*/
export async function Config(params: configType) {
  return request(`${wxPrefix}/Wx/SdkConfig`, {
    method: 'POST',
    data: params,
  });
}
/**获取游戏配置信息*/
export async function getConfig(params: paramsType) {
  return request(`${process.env.couponPrefix}/ActivityToUi/GetLuckyActivity?${stringify(params)}`);
}

/**抽奖前检验*/
export async function getCheckResult(params: paramsType) {
  request(`${process.env.couponPrefix}/LuckyToUi/LuckyCheck`, {
    method: 'POST',
    data: params,
  });
}

/**抽奖机会*/
export async function getAvailableCount(params: paramsType) {
  return request(`${process.env.couponPrefix}/LuckyToUi/GetLuckyChanceForAcyivity?${stringify(params)}`);
}

/**获取活动中奖记录（20）*/
export async function getAllRecord(params: paramsType) {
  return request(`${process.env.couponPrefix}/LuckyToUi/GetAllRecords?${stringify(params)}`);
}

/**获取用户活动中奖记录*/
export async function getUserRecord(params: paramsType) {
  return request(`${process.env.couponPrefix}/LuckyToUi/GetMyRecords?${stringify(params)}`);
}

/**抽奖算法*/
export async function lotteryHandle(params: paramsType) {
  return request(`${process.env.couponPrefix}/LuckyToUi/DrawLottery`, {
    method: 'POST',
    data: params,
  });
}

/**分享好友*/
export async function shareFriend(params: shareType) {
  return request(`${wxPrefix}/WestLuckyDraw/RecordShareToAppointFriendReader`, {
    method: 'POST',
    data: params,
  });
}

/**分享朋友圈*/
export async function shareCommunity(params: paramsType) {
  return request(`${wxPrefix}/WestLuckyDraw/RecordShareToCircleOfFriends`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 券中心管理
 * */

/**获取优惠券列表*/
export async function getCouponList(params: CouponParams) {
  return request(`${process.env.couponPrefix}/CouponToUi/QueryShowCouponList?${stringify(params)}`);
}

/**优惠券详情*/
export async function getCouponDetails(params: CouponDetailsParams) {
  return request(`${process.env.couponPrefix}/CouponToUi/GetUiCouponSimpleDto?${stringify(params)}`);
}





