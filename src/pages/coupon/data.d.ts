export interface CouponListItem {
  unUsedList: dataType;
  usedList: dataType;
  expiredList: dataType;
  firstLoadStatus: boolean;
  tabKey: string;
}

interface dataType {
  TotalCount: number;
  List: Array<any>;
  PageIndex: number;
  PageCount: number;
}

