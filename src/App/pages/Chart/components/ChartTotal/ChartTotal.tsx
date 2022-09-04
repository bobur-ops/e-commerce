import React from 'react'

import { Button, ButtonColor } from '@components/Button'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import styles from './ChartTotal.module.scss'

type ChartTotalType = {
  totalPrice: number
  productsLength: number
}

const ChartTotal: React.FC<ChartTotalType> = ({
  totalPrice,
  productsLength,
}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.total}>
      <div className={styles['total-field']}>
        <div className={styles['total-field__label']}>
          Products({productsLength})
        </div>
        <div className={styles['total-field__result']}>${totalPrice}</div>
      </div>
      <div className={styles['total-field']}>
        <div className={styles['total-field__label']}>Discount</div>
        <div className={styles['total-field__result']}>$0</div>
      </div>
      <div className={styles['total-field']}>
        <div className={styles['total-field__label']}>Total</div>
        <div className={styles['total-field__result']}>${totalPrice}</div>
      </div>
      <div className={styles['total-actions']}>
        <Button className={styles['total-actions__btn']}>Buy now</Button>
        <Button
          color={ButtonColor.secondary}
          className={styles['total-actions__btn']}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default observer(ChartTotal)
