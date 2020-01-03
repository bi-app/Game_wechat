/**
 * title: 优惠券
 * */

import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Dispatch, Action } from 'redux';
import { Page } from '@/components'
import moment from 'moment'

import AcBarcode from "ac-barcode";
import QRCode from "qrcode.react";

import styles from './index.less'
import giftCash from '@/assets/coupon/gift-cash.png'
import Parkingticket from '@/assets/coupon/Parkingticket.png'
import PickupTicket from '@/assets/coupon/PickupTicket.png'
import { couponDetailsState } from "./models/detail";
import {CouponListItem} from "@/pages/coupon/data";

const couponType = [giftCash, PickupTicket, Parkingticket];
const couponText = ['', '已使用', '已过期'];
const dataFormat = 'YYYY.MM.DD'

interface CouponDetailProps {
  dispatch: Dispatch<
    Action<
      | 'couponDetail/setDetails'
      | 'coupon/updateLoadStatus'
      >
    >;
  loading: boolean;
  couponDetail: couponDetailsState;
  coupon: CouponListItem;
}

@connect(
  ({
     couponDetail,
     coupon,
     loading,
   }: {
    couponDetail: couponDetailsState;
    coupon: CouponListItem;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    couponDetail,
    coupon,
    loading: loading,
  }),
)
class CouponDetail extends PureComponent<CouponDetailProps, {}> {

  componentDidMount() {
    const { dispatch, coupon } = this.props;
    const { unUsedList, usedList, expiredList } = coupon;
    if(usedList.TotalCount === 0 && expiredList.TotalCount === 0 && unUsedList.TotalCount === 0){
      dispatch({
        type: 'coupon/updateLoadStatus',
        payload: true
      })
      return;
    }
    dispatch({
      type: 'coupon/updateLoadStatus',
      payload: false
    })
  }

  timeConversion = (time: number, CouponAmt: number) => {
    if(time){
      if(time >= 60 ){
        return `${parseInt(String(time / 60))}小时`
      }
      return `${time}分钟`
    }
    return `￥${CouponAmt}`
  }

  unitRender = (type: number, CouponAmt: number, time: number) => {
    if(type === 0) return `￥${CouponAmt}`
    if(type === 1) return `￥${CouponAmt}`
    return this.timeConversion(time, CouponAmt)
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'couponDetail/setDetails',
      payload: {
        CouponCodeId: "",
        CouponCode: "00000000",
        CouponName: "",
        CouponType: 0,
        CouponAmt: 0,
        CouponStatus: 0,
        CouponTime: 0,
        CouponImage: "http://120.26.211.143:5001/UpLoadFile/Coupon/1b8f46c6-ee82-4063-ab6d-3794da854f64_微信图片_20191012142648.png",
        StartDate: "",
        ShowStartDate: "",
        ExpireDate: "",
        ShowExpireDate: "",
        LimitAmt: null,
        Note: ""
      }
    })
  }

  render() {
    const { couponDetail, loading } = this.props;
    const { couponInfo } = couponDetail;
    const {
      Note,
      ShowStartDate,
      ShowExpireDate,
      LimitAmt,
      CouponName,
      CouponTime,
      CouponType,
      CouponAmt,
      CouponCode,
      CouponImage,
      CouponStatus
    } = couponInfo;

    const barcodeH = window.innerWidth / 100 * 16;
    const barcodeW = window.innerWidth / 100 * 0.6;

    return (
      <Page holdText='正在加载详情...' loading={loading.effects['couponDetail/query']}>
        <div className={styles.detail}>
          <div className={styles.bg}>
            <img src={require('@/assets/coupon/parking-fee-bg.png')} className={styles["bg-img"]} alt=""/>
          </div>
          <div className={styles.main}>
            <div className={styles["main-cont"]}>
              <div className={styles['panel-warp']}>
                <div className={styles["panel-top"]}>
                  <div className={styles['tips-circle']}>
                    <img src={couponType[CouponType]} alt=""/>
                  </div>
                  <h3 className={styles.title} style={{WebkitBoxOrient: 'vertical'}}>{CouponName}</h3>
                  <p className={styles['extra-des']}>{this.unitRender(CouponType, CouponAmt, CouponTime)}</p>
                  <div className={styles['explain-img']}>
                    <img src={CouponImage} alt=""/>
                  </div>
                  {
                    CouponStatus === 0 && (
                      <>
                        <div className={styles.barcode}>
                          <AcBarcode
                            value={CouponCode}
                            displayValue={false}
                            width={barcodeW}
                            height={barcodeH}
                            margin={0}
                          />
                        </div>
                        <div className={styles.QRcode}>
                          <QRCode value={CouponCode} />
                        </div>
                        <p className={styles.codeNo}>{CouponCode}</p>
                      </>
                    )
                  }
                  {
                    couponText[CouponStatus] && (
                      <p className={styles['status-text']}>{couponText[CouponStatus]}</p>
                    )
                  }
                </div>
                <div className={styles['card-bar-img']}>
                  <img src={require('@/assets/coupon/card-bar-img.png')} alt=""/>
                </div>
                <div className={styles["panel-bottom"]}>
                    <div className={styles['panel-bottom-list']}>
                      <p className={styles['left-title']}>有效期</p>
                      <p className={styles['right-cont']} style={{textAlign: 'right'}}>
                        {
                          !ShowExpireDate ? '永久有效' :
                            `${moment(ShowStartDate).format(dataFormat)} - ${moment(ShowExpireDate).format(dataFormat)}`
                        }
                      </p>
                    </div>
                    {
                      LimitAmt && (
                        <div className={styles['panel-bottom-list']}>
                          <p className={styles['left-title']}>最低消费金额</p>
                          <p className={styles['right-cont']}>{LimitAmt}元</p>
                        </div>
                      )
                    }
                    <div className={styles['panel-bottom-list']}>
                      <p className={styles['left-title']}>使用说明</p>
                      <p className={styles['right-cont']}>{Note || '暂无说明'}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default CouponDetail
