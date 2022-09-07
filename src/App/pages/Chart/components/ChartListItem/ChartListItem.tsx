import React from 'react'

import { Button, ButtonColor } from '@components/Button'
import { IChartProduct } from '@store/models/chartProduct'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import styles from './ChartListItem.module.scss'

type ChartListItemType = {
  product: IChartProduct
  decreaseCount: (id: number) => void
  increaseCount: (id: number) => void
  deleteItem: (product: IChartProduct) => void
}

const ChartListItem: React.FC<ChartListItemType> = ({
  product,
  decreaseCount,
  increaseCount,
  deleteItem,
}) => {
  return (
    <div className={styles['list-item']}>
      <Link key={product.id} to={`/product/${product.id}`}>
        <div className={styles['list-item__info']}>
          <img
            src={product.image}
            alt="product"
            className={styles['list-item__img']}
          />
          <div className={styles['list-item__title']}>{product.title}</div>
        </div>
      </Link>
      <div className={styles['list-item__count']}>
        <Button
          className={styles['count__btn']}
          color={ButtonColor.secondary}
          onClick={() => decreaseCount(product.id)}
        >
          <span className={styles.minus}></span>
        </Button>
        <div className={styles['count__amount']}>{product.quantity}</div>
        <Button
          className={styles['count__btn']}
          color={ButtonColor.secondary}
          onClick={() => increaseCount(product.id)}
        >
          <span className={styles.plus}></span>
        </Button>
      </div>
      <div className={styles['list-item__actions']}>
        <div className={styles['list-item__price']}>
          ${(product.price * product.quantity).toFixed(2)}
        </div>
        <Button
          onClick={() => deleteItem(product)}
          color={ButtonColor.secondary}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default observer(ChartListItem)
