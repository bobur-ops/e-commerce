import React from 'react'

import { useRootStore } from '@context/StoreContext'
import { IChartProduct } from '@store/models/chartProduct'
import { observer } from 'mobx-react-lite'

import styles from './Chart.module.scss'
import { ChartList, ChartTotal } from './components'

const Chart = () => {
  const { chartStore } = useRootStore()

  return (
    <div className="container">
      <div className={styles['chart-title']}>Chart</div>
      <div className={styles['chart-content']}>
        {chartStore.chartProducts.length ? (
          <>
            <ChartList
              increaseCount={(id: number) => chartStore.increaseItemCount(id)}
              decreaseCount={(id: number) => chartStore.decreaseItemCount(id)}
              data={chartStore.chartProducts}
              deleteItem={(product: IChartProduct) =>
                chartStore.changeProductChart(product)
              }
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
