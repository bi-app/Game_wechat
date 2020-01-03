import {Effect, EffectsCommandMap, Subscription} from 'dva';
import { AnyAction, Reducer } from 'redux';
import {getCouponDetails} from "@/services/api";
import { pathMatchRegexp } from '@/utils'

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: couponDetailsState) => T) => T },
) => void;

interface paramsType {
  CouponCodeId: string
  CouponCode: string
  CouponName: string
  CouponType: number
  CouponStatus: number
  CouponAmt: number
  CouponTime: number
  CouponImage: string
  StartDate: string
  ShowStartDate: string
  ExpireDate: string
  ShowExpireDate: string
  LimitAmt: any
  Note: string
}

export interface couponDetailsState {
  couponInfo: paramsType
}

export interface GlobalModelType {
  namespace: string;
  state: couponDetailsState;
  effects: {
    query: Effect;
  };
  reducers: {
    setDetails: Reducer<couponDetailsState>;
  };
  subscriptions: {
    setup: Subscription,
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'couponDetail',
  state: {
    couponInfo: {
      CouponCodeId: "",
      CouponCode: "00000000",
      CouponName: "",
      CouponStatus: 0,
      CouponType: 0,
      CouponAmt: 0,
      CouponTime: 0,
      CouponImage: "http://120.26.211.143:5001/UpLoadFile/Coupon/1b8f46c6-ee82-4063-ab6d-3794da854f64_微信图片_20191012142648.png",
      StartDate: "",
      ShowStartDate: "",
      ExpireDate: "",
      ShowExpireDate: "",
      LimitAmt: null,
      Note: ""
    }
  },
  effects: {
    *query({ payload, callback }, { all, call, put }) {
      const response = yield call(getCouponDetails, payload)
      const { Status, Data } = response;
      if( Status === 1 ){
        yield put({
          type: 'setDetails',
          payload: Data,
        });
      }

    },
  },

  reducers: {
    setDetails(state, { payload })  {
      return { ...state, couponInfo: payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }): void {
      history.listen(({ pathname }): void => {
        const match = pathMatchRegexp('/coupon/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { couponCodeId: match[1] } })
        }
      });
    },
  },
};

export default GlobalModel;
