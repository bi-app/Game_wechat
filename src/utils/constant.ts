import shortid from 'shortid';
export const CANCEL_REQUEST_MESSAGE: string = 'cancle request';
export const WX_PREFIX = process.env.NODE_ENV === 'development' ? '/wx' : '';

export const codeMessage = {
  1: '活动异常',
  2: '没有抽奖机会',
  3: '没有奖品',
  4: '全部奖品发完',
  5: '当前奖品发完',
  6: '未中奖',
  7: '抽奖机会错误',
  8: '奖池错误',
  9: '未确认抽奖人身份',
  10: '转盘错误',
  11: '中奖',
};

export const eggInitData = [
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
];

export const eggData = [
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
  {
    id: shortid.generate(),
    status: 0
  },
];

export const hammerPoX = {
  0: '73vw',
  1: '39vw',
  2: '5.33333vw',
  3: '73vw',
  4: '39vw',
  5: '5.33333vw',
  6: '73vw',
  7: '39vw',
  8: '5.33333vw'
}

export const hammerPoY = {
  0: '-2.66667vw',
  1: '-2.66667vw',
  2: '-2.66667vw',
  3: '28vw',
  4: '28vw',
  5: '28vw',
  6: '60vw',
  7: '60vw',
  8: '60vw'
}
