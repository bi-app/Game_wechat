import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Subscription } from 'dva'

// import { pathMatchRegexp } from '@/utils'
import { CouponListItem } from './data'
import { getCouponList } from '@/services/api.ts'

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: CouponListItem) => T) => T },
) => void;

export interface EggsModelType {
  namespace: string;
  state: CouponListItem,
  effects: {
    initFetch: Effect;
    fetchUnUsed: Effect;
    fetchUsed: Effect;
    fetchExpired: Effect;
  };
  reducers: {
    saveUnUsed: Reducer<CouponListItem>;
    saveUsed: Reducer<CouponListItem>;
    saveExpired: Reducer<CouponListItem>;
    updateLoadStatus: Reducer<CouponListItem>;
    updateTabKey: Reducer<CouponListItem>;
  };
  subscriptions: {
    setup: Subscription,
  };
}

const CouponModel: EggsModelType = {
  namespace: 'coupon',
  state: {
    unUsedList: {
      TotalCount: 0,
      List: [],
      PageIndex: 0,
      PageCount: 0
    },
    usedList: {
      TotalCount: 0,
      List: [],
      PageIndex: 0,
      PageCount: 0
    },
    expiredList: {
      TotalCount: 0,
      List: [],
      PageIndex: 0,
      PageCount: 0
    },
    firstLoadStatus: true,
    tabKey: ''
  },
  effects: {
    /**初始化请求*/
    *initFetch({ payload, callback }, { all, call, put }) {
      const [result1, result2, result3]  = yield all([
        call(getCouponList, payload[0]),
        call(getCouponList, payload[1]),
        call(getCouponList, payload[2]),
      ])
      if(result1.Status === 1){
        yield put({
          type: 'saveUnUsed',
          payload: result1.Data,
        });
      }
      if(result2.Status === 1){
        yield put({
          type: 'saveUsed',
          payload: result2.Data,
        });
      }
      if(result3.Status === 1){
        yield put({
          type: 'saveExpired',
          payload: result3.Data,
        });
      }
    },
    *fetchUnUsed({ payload, callback }, { call, put }) {
      const response = yield call(getCouponList, payload);
      const { Status, Data } = response;
      if(Status === 1 && callback ){
        callback(Data)
      }

    },
    *fetchUsed({ payload, callback }, { call, put }) {
      const response = yield call(getCouponList, payload);
      const { Status, Data } = response;
      if(Status === 1 && callback ){
        callback(Data)
      }
    },
    *fetchExpired({ payload, callback }, { call, put }) {
      const response = yield call(getCouponList, payload);
      const { Status, Data } = response;
      if(Status === 1 && callback ){
        callback(Data)
      }
    },
  },
  reducers: {
    saveUnUsed(state, action) {
      return {
        ...state,
        unUsedList: action.payload,
      };
    },
    saveUsed(state, action) {
      return {
        ...state,
        usedList: action.payload,
      };
    },
    saveExpired(state, action) {
      return {
        ...state,
        expiredList: action.payload,
      };
    },
    updateLoadStatus(state, action) {
      return {
        ...state,
        firstLoadStatus: action.payload,
      };
    },
    updateTabKey(state, action) {
      return {
        ...state,
        tabKey: action.payload,
      };
    },


  },
  subscriptions: {
    setup({ dispatch, history }): void {
      history.listen((location: any) => {
        //const payload = [{Index: 1, Size: 10, CouponState: 0 }, {Index: 1, Size: 10, CouponState: 1 }, {Index: 1, Size: 10, CouponState: 2 },];
        // dispatch({saveExpired
        //   type: 'initFetch',
        //   payload
        // });
      });
    },
  },

};

export default CouponModel;
