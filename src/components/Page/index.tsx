import React, { memo } from 'react';
import { Loader } from '@/components'
import styles from './index.less'

interface loadingProps {
  holdText: string,
  loading: boolean,
  children: any
}

export default memo(({children, loading, holdText}: loadingProps) => {
  return (
    <div className={styles.pageWarp}>
      <Loader
        spinning={loading}
        loadText={holdText}
        fullScreen
      />
      { children }
    </div>
    )

});
