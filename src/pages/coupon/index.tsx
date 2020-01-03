/**
 * title: 我的券包
 * */

import React, { BaseSyntheticEvent, PureComponent } from 'react'
import { connect } from 'dva';
import Link from 'umi/link'
import { Dispatch, Action } from 'redux';
import moment from 'moment';

import styles from './index.less'
import giftCash from '@/assets/coupon/gift-cash.png'
import Parkingticket from '@/assets/coupon/Parkingticket.png'
import PickupTicket from '@/assets/coupon/PickupTicket.png'
import giftCashAfter from '@/assets/coupon/gift-cash-after.png'
import ParkingticketAfter from '@/assets/coupon/Parkingticket-after.png'
import PickupTicketafter from '@/assets/coupon/PickupTicket-after.png'

import { Page, CouponItem } from '@/components'
import {CouponListItem, dataType} from "@/pages/coupon/data";
import LoadMore from './components/LoadMore'

const couponType = [giftCash, PickupTicket, Parkingticket];
const usedCouponType = [giftCashAfter, PickupTicketafter, ParkingticketAfter];
const CouponStatus = ['', '已过期', '即将过期'];

interface CouponState {
  activeid: string;
}

interface CouponListProps {
  dispatch: Dispatch<
    Action<
      | 'coupon/initFetch'
      | 'coupon/fetchUnUsed'
      | 'coupon/fetchUsed'
      | 'coupon/fetchExpired'
      | 'coupon/saveUnUsed'
      | 'coupon/saveUsed'
      | 'coupon/saveExpired'
      | 'coupon/updateTabKey'
      >
    >;
  loading: boolean;
  coupon: CouponListItem;
}

@connect(
  ({
     coupon,
     loading,
   }: {
    coupon: CouponListItem;
    loading: {

      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    coupon,
    loading: loading,
  }),
)
export default class CouponList extends PureComponent<CouponListProps, CouponState> {

  state: CouponState = {
    activeid: "1",
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const payload = [{Index: 1, Size: 10, CouponState: 0 }, {Index: 1, Size: 10, CouponState: 1 }, {Index: 1, Size: 10, CouponState: 2 },];
    dispatch({
      type: 'coupon/initFetch',
      payload
    });
  }

  static getDerivedStateFromProps(nextProps: CouponListProps, prevState: CouponState) {
    const { coupon } = nextProps;
    const { tabKey } = coupon;
    if(tabKey && tabKey !== prevState.activeid){
      return {
        activeid: tabKey
      }
    }
    return null
  }

  /**优惠券类别切换操作*/
  onChange = (e: BaseSyntheticEvent) => {
    const activeid = e.target.getAttribute("data-id");
    if(this.state.activeid === activeid) {
      this.handleUpdateTabKey("4");
      return;
    }
    this.handleUpdateTabKey(activeid);
  }

  /***/
  renderStatus = (Date: Date) => {
    if(moment().valueOf() > moment(Date).valueOf()) return 1;
    const diffVlu = moment().diff(moment(Date), 'days');
    if(Math.abs(diffVlu) <= 1) return 2;
    return 0
  }

  /****/
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

  handleUpdateTabKey = (type: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'coupon/updateTabKey',
      payload: type
    })
  }

  UnUsedRow = (rowData: any) => {
    return (
      <div className={styles['list-col-pd']} key={rowData.CouponCodeId}>
        <Link to={`coupon/${rowData.CouponCodeId}`} onClick={() => this.handleUpdateTabKey('1')}>
          <div className={styles['list-item']}>
            <div className={styles["list-item-img"]}><img src={couponType[rowData.CouponType]} alt=""/></div>
            <div className={styles["list-item-label"]}>
              <p className={styles["item-label-title"]} style={{WebkitBoxOrient: 'vertical'}}>{rowData.Name}</p>
              <p className={styles["item-label-des"]}>{this.unitRender(rowData.CouponType, rowData.CouponAmt, rowData.CouponTime)}</p>
            </div>
            <div className={styles["list-item-tips"]} style={{WebkitBoxOrient: 'vertical'}}>{CouponStatus[this.renderStatus(rowData.ShowExpireDate)]}</div>
          </div>
        </Link>
      </div>
    );
  };

  UsedRow = (_: any) => {
    return (
      <div className={styles['list-col-pd']} key={_.CouponCodeId}>
        <Link to={`coupon/${_.CouponCodeId}`} onClick={() => this.handleUpdateTabKey('2')}>
          <div className={styles['list-item']}>
            <div className={styles["list-item-img"]}><img src={usedCouponType[_.CouponType]} alt=""/></div>
            <div className={styles["list-item-label"]}>
              <p className={styles["item-label-title"]} style={{WebkitBoxOrient: 'vertical'}}>{_.Name}</p>
              <p className={styles["item-label-des"]}>{this.unitRender(_.CouponType, _.CouponAmt, _.CouponTime)}</p>
            </div>
            <div className={styles["list-item-tips"]} style={{WebkitBoxOrient: 'vertical'}}>已使用</div>
          </div>
        </Link>
      </div>
    );
  };

  ExpiredRow = (_: any) => {
    return (
      <div className={styles['list-col-pd']} key={_.CouponCodeId}>
        <Link to={`coupon/${_.CouponCodeId}`} onClick={() => this.handleUpdateTabKey('3')}>
          <div className={styles['list-item']}>
            <div className={styles["list-item-img"]}><img src={usedCouponType[_.CouponType]} alt=""/></div>
            <div className={styles["list-item-label"]}>
              <p className={styles["item-label-title"]} style={{WebkitBoxOrient: 'vertical'}}>{_.Name}</p>
              <p className={styles["item-label-des"]}>{this.unitRender(_.CouponType, _.CouponAmt, _.CouponTime)}</p>
            </div>
            <div className={styles["list-item-tips"]} style={{WebkitBoxOrient: 'vertical'}}>已过期</div>
          </div>
        </Link>
      </div>
    );
  };


  /**未使用请求*/
  onEndReachedUnUsed = (event: any) => {
    const { dispatch, coupon } = this.props;
    const { unUsedList } = coupon;
    const { PageIndex, PageCount } = unUsedList;
    if (PageIndex === PageCount) {
      return;
    }

    let Index = PageIndex + 1;
    dispatch({
      type: 'coupon/fetchUnUsed',
      payload: {
        Index,
        Size: 10,
        CouponState: 0
      },
      callback: (res: dataType) => {
        const {  List, ...other } = res
        dispatch({
          type: 'coupon/saveUnUsed',
          payload: {
            ...other,
            List: unUsedList.List.concat(List)
          }
        })
      }
    })

  }

  /**已使用请求*/
  onEndReachedUsed = (event: any) => {
    const { dispatch, coupon } = this.props;
    const { usedList } = coupon;
    const { PageIndex, PageCount } = usedList;
    if (PageIndex === PageCount) {
      return;
    }

    let Index = PageIndex + 1;
    dispatch({
      type: 'coupon/fetchUsed',
      payload: {
        Index,
        Size: 10,
        CouponState: 1
      },
      callback: (res: dataType) => {
        const {  List, ...other } = res;
        dispatch({
          type: 'coupon/saveUsed',
          payload: {
            ...other,
            List: usedList.List.concat(List)
          }
        })
      }
    })
  }

  /**已过期请求*/
  onEndReachedExpired = (event: any) => {
    const { dispatch, coupon } = this.props;
    const { expiredList } = coupon;
    const { PageIndex, PageCount } = expiredList;
    if (PageIndex === PageCount) {
      return;
    }

    let Index = PageIndex + 1;
    dispatch({
      type: 'coupon/fetchExpired',
      payload: {
        Index,
        Size: 10,
        CouponState: 2
      },
      callback: (res: dataType) => {
        const {  List, ...other } = res;
        dispatch({
          type: 'coupon/saveExpired',
          payload: {
            ...other,
            List: expiredList.List.concat(List)
          }
        })
      }
    })
  }

  /**未使用*/
  UnusedCouponHtml = () => {
    const { coupon, loading } = this.props;
    const { unUsedList } = coupon;
    const fixedHeight = unUsedList.PageCount > 1;
    if(fixedHeight) {
      return (
        <LoadMore
          dataSource={unUsedList.List}
          hasMore={unUsedList.PageIndex === unUsedList.PageCount}
          isLoading={loading.effects['coupon/fetchUnUsed']}
          renderRow={this.UnUsedRow}
          onEndReached={this.onEndReachedUnUsed}
        />
      )
    }
    return (
      <div className={styles['list-view-section-body']}>
        {
          unUsedList.List.map(_ => (
            <div className={styles['list-col-pd']} key={_.CouponCodeId}>
              <Link to={`coupon/${_.CouponCodeId}`} onClick={() => this.handleUpdateTabKey('1')}>
                <div className={styles['list-item']}>
                  <div className={styles["list-item-img"]}><img src={couponType[_.CouponType]} alt=""/></div>
                  <div className={styles["list-item-label"]}>
                    <p className={styles["item-label-title"]} style={{WebkitBoxOrient: 'vertical'}}>{_.Name}</p>
                    <p className={styles["item-label-des"]}>{this.unitRender(_.CouponType, _.CouponAmt, _.CouponTime)}</p>
                  </div>
                  <div className={styles["list-item-tips"]} style={{WebkitBoxOrient: 'vertical'}}>{CouponStatus[this.renderStatus(_.ShowExpireDate)]}</div>
                </div>
              </Link>
            </div>
          ))
        }
        <div className={styles.loadcomplete}>已加载全部</div>
      </div>
    )
  }

  /**已使用*/
  usedCouponHtml = () => {
    const { coupon, loading } = this.props;
    const { usedList } = coupon;
    const fixedHeight = usedList.PageCount > 1;
    if(fixedHeight) {
      return (
        <LoadMore
          dataSource={usedList.List}
          hasMore={usedList.PageIndex === usedList.PageCount}
          isLoading={loading.effects['coupon/fetchUsed']}
          renderRow={this.UsedRow}
          onEndReached={this.onEndReachedUsed}
        />
      )
    }
    return (
      <div className={styles['list-view-section-body']}>
        {
          usedList.List.map(_ => (
            <div className={styles['list-col-pd']} key={_.CouponCodeId}>
              <Link to={`coupon/${_.CouponCodeId}`} onClick={() => this.handleUpdateTabKey('2')}>
                <div className={styles['list-item']}>
                  <div className={styles["list-item-img"]}><img src={usedCouponType[_.CouponType]} alt=""/></div>
                  <div className={styles["list-item-label"]}>
                    <p className={styles["item-label-title"]} style={{WebkitBoxOrient: 'vertical'}}>{_.Name}</p>
                    <p className={styles["item-label-des"]}>{this.unitRender(_.CouponType, _.CouponAmt, _.CouponTime)}</p>
                  </div>
                  <div className={styles["list-item-tips"]} style={{WebkitBoxOrient: 'vertical'}}>已使用</div>
                </div>
              </Link>
            </div>
          ))
        }
        <div className={styles.loadcomplete}>已加载全部</div>
      </div>
    )
  }

  /**已过期*/
  expiredCouponHtml = () => {
    const { coupon, loading } = this.props;
    const { expiredList } = coupon;
    const fixedHeight = expiredList.PageCount > 1;
    if(fixedHeight) {
      return (
        <LoadMore
          dataSource={expiredList.List}
          hasMore={expiredList.PageIndex === expiredList.PageCount}
          isLoading={loading.effects['coupon/fetchExpired']}
          renderRow={this.ExpiredRow}
          onEndReached={this.onEndReachedExpired}
        />
      )
    }
    return (
      <div className={styles['list-view-section-body']}>
        {
          expiredList.List.map(_ => (
            <div className={styles['list-col-pd']} key={_.CouponCodeId}>
              <Link to={`coupon/${_.CouponCodeId}`} onClick={() => this.handleUpdateTabKey('3')}>
                <div className={styles['list-item']}>
                  <div className={styles["list-item-img"]}><img src={usedCouponType[_.CouponType]} alt=""/></div>
                  <div className={styles["list-item-label"]}>
                    <p className={styles["item-label-title"]} style={{WebkitBoxOrient: 'vertical'}}>{_.Name}</p>
                    <p className={styles["item-label-des"]}>{this.unitRender(_.CouponType, _.CouponAmt, _.CouponTime)}</p>
                  </div>
                  <div className={styles["list-item-tips"]} style={{WebkitBoxOrient: 'vertical'}}>已过期</div>
                </div>
              </Link>
            </div>
          ))
        }
        <div className={styles.loadcomplete}>已加载全部</div>
      </div>
    )
  }


  render() {
    const { activeid } = this.state;
    const { coupon, loading } = this.props;
    const { usedList, expiredList, unUsedList, firstLoadStatus } = coupon;

    return (
      <Page loading={firstLoadStatus && loading.effects['coupon/initFetch']} holdText={'正在获取优惠券列表'}>
          <div className={styles.coupon}>
            <ul className={styles["title-warp"]}>
              <CouponItem
                title={`未使用（${unUsedList.TotalCount}）`}
                Kid={'1'}
                onChange={this.onChange}
                leftImg={require("@/assets/coupon/coupon-before.png")}
                activeId={activeid}
                expired={false}
                fixedHeight={unUsedList.PageCount > 1}
              >
                <div className={styles['coupon-list-cont']}>
                  {
                    unUsedList.List.length !== 0 ?
                      this.UnusedCouponHtml() :
                      <div className={styles.no_data_hold}>
                        <img src={require('@/assets/coupon/no-data-hold.png')} alt=""/>
                        <p className={styles.holdtext}>暂无未使用券</p>
                      </div>
                  }
                </div>
              </CouponItem>
              <CouponItem
                title={`已使用（${usedList.TotalCount}）`}
                Kid={'2'}
                onChange={this.onChange}
                leftImg={require("@/assets/coupon/coupon-used.png")}
                activeId={activeid}
                expired={true}
                fixedHeight={usedList.PageCount > 1}
              >
                <div className={styles['coupon-list-cont'] + ' ' + styles.expired}>
                  {
                    usedList.List.length !== 0 ? this.usedCouponHtml() : <div className={styles.no_data_hold}>
                      <img src={require('@/assets/coupon/no-data-hold.png')} alt=""/>
                      <p className={styles.holdtext}>暂无已使用券</p>
                    </div>
                  }
                </div>
              </CouponItem>
              <CouponItem
                title={`已过期（${expiredList.TotalCount}）`}
                Kid={'3'}
                onChange={this.onChange}
                leftImg={require("@/assets/coupon/coupon-after.png")}
                activeId={activeid}
                expired={true}
                fixedHeight={expiredList.PageCount > 1}
              >
                <div className={styles['coupon-list-cont']  + ' ' + styles.expired}>
                  {
                    expiredList.List.length !== 0 ? this.expiredCouponHtml() : <div className={styles.no_data_hold}>
                      <img src={require('@/assets/coupon/no-data-hold.png')} alt=""/>
                      <p className={styles.holdtext}>暂无过期券</p>
                    </div>
                  }
                </div>
              </CouponItem>
            </ul>
          </div>
      </Page>
    )
  }

}
