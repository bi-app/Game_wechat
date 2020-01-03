import React, { PureComponent } from 'react'
import Link from 'umi/link'
import { ListView } from 'antd-mobile';
import moment from 'moment'

import styles from './index.less'
import giftCash from '@/assets/coupon/gift-cash.png'
import Parkingticket from '@/assets/coupon/Parkingticket.png'
import PickupTicket from '@/assets/coupon/PickupTicket.png'
import giftCashAfter from '@/assets/coupon/gift-cash-after.png'
import ParkingticketAfter from '@/assets/coupon/Parkingticket-after.png'
import PickupTicketafter from '@/assets/coupon/PickupTicket-after.png'


const couponType = [giftCash, PickupTicket, Parkingticket];
const usedCouponType = [giftCashAfter, PickupTicketafter, ParkingticketAfter];
const CouponStatus = ['', '已过期', '即将过期'];


function MyBody(props: any) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs: Array<any> = [];
let rowIDs: Array<any> = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

interface ListScrollState {
  dataSource: any,
  isLoading: boolean,
  hasMore: boolean,
}

const getSectionData = (dataBlob: any, sectionID: any) => dataBlob[sectionID];
const getRowData = (dataBlob: any, sectionID: any, rowID: any) => dataBlob[rowID];

const dataSource = new ListView.DataSource({
  getRowData,
  getSectionHeaderData: getSectionData,
  rowHasChanged: (row1: any, row2: any) => row1 !== row2,
  sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2,
});

console.log(dataSource)

interface ListScrollProps {
  dataSource: Array<any>;
  isLoading: boolean;
  hasMore: boolean;
  renderRow: any;
  onEndReached: (event: any) => void;
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1: any, r2: any) => r1 !== r2
});

export default class ListScroll extends PureComponent<ListScrollProps, ListScrollState> {
  lv: React.RefObject<any> = React.createRef();
  rData: any;

  state: ListScrollState = {
    dataSource: ds,
    isLoading: true,
    hasMore: false,
  };

  timeConversion = (time: number) => {
    if(time >= 60 ){
      return `${parseInt(String(time / 60))}小时`
    }
    return `${time}分钟`
  }

  unitRender = (type: number, CouponAmt: number, time: number) => {
    if(type === 0) return `￥${CouponAmt}`
    if(type === 1) return null
    return this.timeConversion(time)

  }

  renderStatus = (Date: Date) => {
    if(moment().valueOf() > moment(Date).valueOf()) return 1;
    const diffVlu = moment().diff(moment(Date));
    if(diffVlu < 172800000) return 2;
    return 0
  }

  render() {
    const { dataSource, hasMore, isLoading, onEndReached, renderRow, } = this.props;

    return (
      <ListView
        ref={this.lv}
        dataSource={this.state.dataSource.cloneWithRows(dataSource)}
        renderFooter={() => (<div className={styles.loading}>
          {isLoading ? '加载中...' : '已加载全部'}
        </div>)}
        renderBodyComponent={() => <MyBody />}
        renderRow={renderRow}
        style={{
          overflow: 'auto',
        }}
        className={styles.container}
        pageSize={10}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={80}
      />
    )
  }
}
