import * as React from 'react'

import classNames from 'classnames'

import { Loader, LoaderSize } from '../Loader/Loader'
import styles from './withloader.module.scss'

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean
}>

const WithLoader: React.FC<WithLoaderProps> = ({ loading, children }) => {
  return (
    <div className={classNames(styles.wrapper, { loading: loading })}>
      {loading && (
        <Loader size={LoaderSize.l} className={styles.wrapper__loader} />
      )}
      {children}
    </div>
  )
}

export default WithLoader
