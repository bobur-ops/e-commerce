import * as React from 'react'

import classNames from 'classnames'

import styles from './input.module.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  value: string
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  ...rest
}) => {
  const inputClass = classNames(styles.input, className)

  return (
    <input
      className={inputClass}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}

export default Input
