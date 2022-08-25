import classNames from 'classnames'

import styles from './loader.module.scss'

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

type LoaderProps = {
  loading?: boolean
  size?: LoaderSize
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
  size = LoaderSize.m,
  loading = true,
  className,
}) => {
  const loaderClass = classNames(
    styles.loader,
    styles[`loader_size-${size}`],
    className
  )

  return loading ? <div className={loaderClass}></div> : null
}
