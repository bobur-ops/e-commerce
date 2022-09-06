import React from 'react'

import { Button, ButtonColor } from '@components/Button'
import { IChartProduct } from '@store/models/chartProduct'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import ChartListItem from '../ChartListItem/ChartListItem'
import styles from './ChartList.module.scss'

type ChartListType = {
  data: IChartProduct[]
  deleteItem: (product: IChartProduct) => void
  increaseCount: (id: number) => void
  decreaseCount: (id: number) => void
}

const ChartList: React.FC<ChartListType> = ({
  data,
  deleteItem,
  increaseCount,
  decreaseCount,
}) => {
  return (
    <div className={styles.list}>
      {data.map((product: IChartProduct) => (
        <ChartListItem
          key={product.id}
          decreaseCount={decreaseCount}
          deleteItem={deleteItem}
          increaseCount={increaseCount}
          product={product}
        />
      ))}
    </div>
  )
}

export default observer(ChartList)
