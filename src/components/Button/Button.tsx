import { Loader, LoaderSize } from '@components/Loader/Loader'
import classnames from 'classnames'

import styles from './button.module.scss'

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
}
export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean
  color?: ButtonColor
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,

  color = ButtonColor.primary,
  className,
  ...rest
}) => {
  const buttonClass = classnames(
    styles.button,
    styles[`button_color-${color}`],
    className
  )

  return (
    <button
      className={buttonClass}
      disabled={rest.disabled || loading}
      {...rest}
    >
      {loading && <Loader size={LoaderSize.s} />}
      {children}
    </button>
  )
}
