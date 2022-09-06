import React from 'react'

import { useGlobalStore } from '@context/GlobalContext'
import { observer } from 'mobx-react-lite'

import styles from './Chart.module.scss'
import { ChartList, ChartTotal } from './components'

const Chart = () => {
  const { chartStore } = useGlobalStore()

  return (
    <div className="container">
      <div className={styles['chart-title']}>Chart</div>
      <div className={styles['chart-content']}>
        {chartStore.chartProducts.length ? (
          <>
            <ChartList
              increaseCount={chartStore.increaseItemCount}
              decreaseCount={chartStore.decreaseItemCount}
              data={chartStore.chartProducts}
              deleteItem={chartStore.changeProductChart}
            />
            <ChartTotal
              productsLength={chartStore.chartProducts.length}
              totalPrice={chartStore.totalPrice}
            />
          </>
        ) : (
          <div>There is no item in your chart</div>
        )}
      </div>
    </div>
  )
}

export default observer(Chart)
