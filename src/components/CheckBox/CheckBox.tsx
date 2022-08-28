import * as React from 'react'

import styles from './Checkbox.module.css'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (value: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled, ...rest }) => {
  return (
    <div className={styles[`checkbox-container`]}>
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="checkbox"
        {...rest}
      />
      <div className={styles.checkmark}>
        <span>
          <svg
            width="28"
            height="27"
            viewBox="0 0 28 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="-1.5"
              x2="14.8149"
              y2="-1.5"
              transform="matrix(-0.715944 -0.698158 0.715944 -0.698158 13.1978 24.3062)"
              stroke="#518581"
              stroke-width="3"
            />
            <line
              y1="-1.5"
              x2="22.2223"
              y2="-1.5"
              transform="matrix(0.715944 -0.698158 0.715944 0.698158 11.6064 25.8577)"
              stroke="#518581"
              stroke-width="3"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default CheckBox
