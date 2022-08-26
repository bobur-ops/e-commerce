import * as React from 'react'

import classNames from 'classnames'

import styles from './MultiDropDown.module.scss'

export type Option = {
  key: string
  value: string
}

export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[]
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: Option | null
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option) => void
  /** Заблокирован ли дропдаун */
  disabled?: boolean
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option | null) => string
}

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [isOpened, setIsOpened] = React.useState(false)

  React.useEffect(() => {
    if (disabled) setIsOpened(false)
  }, [disabled])

  const toggleDropDown = () => setIsOpened(!isOpened)

  return (
    <div className={styles[`dropdown-container`]}>
      <button
        disabled={disabled}
        onClick={toggleDropDown}
        className={classNames(
          `${styles.dropdown__item} ${styles[`dropdown-selected`]}`,
          {
            focus: isOpened,
            disabled: disabled,
          }
        )}
      >
        <div className={styles['dropdown-selected__item']}>
          <p>{pluralizeOptions(value)}</p>
        </div>
      </button>
      <div className={styles['dropdown-items']}>
        {isOpened &&
          options.map((option) => (
            <div
              key={option.key}
              className={`${styles.dropdown__item} ${
                option.key === value?.key ? styles.selected : ''
              }`}
              onClick={() => {
                onChange(option)
                toggleDropDown()
              }}
            >
              {option.value}
            </div>
          ))}
      </div>
    </div>
  )
}
