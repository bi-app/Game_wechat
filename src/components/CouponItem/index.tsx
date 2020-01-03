import React, {BaseSyntheticEvent, memo} from 'react'
import styles from './index.less'
import { Icon } from 'antd-mobile'
import classNames from "classNames";

interface CouponProps {
  Kid: string
  activeId: string
  title: string
  leftImg: string
  children: any
  expired: boolean
  fixedHeight: boolean;
  onChange: (e: BaseSyntheticEvent) => void;
}

export default memo(({ Kid, children, title, leftImg, onChange, activeId, expired, fixedHeight  }: CouponProps) => {

  return (
    <li className={styles['single-list']}>
      <div
        className={classNames(styles["title-main"], {
          [styles['title-main-active']]: activeId === Kid
        })}
        data-id={Kid}
        onClick={onChange}
      >
        <img className={styles["left-img"]} src={leftImg} alt="左侧图标"/>
        <h3 className={styles["title-text"]}>{title}</h3>
        <Icon className={classNames(styles["right-point"], {
          [styles["to-bottom"]]: activeId === Kid
        })} type="right" size='md' />
      </div>
      <div className={classNames(styles["coupon-list"], {
        [styles["coupon-hide"]]: activeId === Kid,
        [styles.expired]: expired,
        [styles.fixed]: fixedHeight,
      })}>
        {children}
      </div>
    </li>
  )
})
