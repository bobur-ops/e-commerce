import React, { useState } from 'react'

import { Button, ButtonColor } from '@components/Button'
import { useGlobalStore } from '@context/GlobalContext'
import {
  IChartProduct,
  normalizeChartProduct,
} from '@store/models/chartProduct'
import { IProductModel } from '@store/models/product'
import { observer } from 'mobx-react-lite'

import styles from './Product.module.scss'

interface Props {
  data: IProductModel | null
}

const colors = ['151411', '314443', 'C5A26E', 'D8DBE0']

const ProductInfo: React.FC<Props> = ({ data }) => {
  const [expandDesc, setExpandDesc] = useState(false)
  const { chartStore } = useGlobalStore()
  if (!data) return <div className={styles.error}>Data not found</div>

  const isInCart = chartStore.chartProducts.some(
    (el: IChartProduct) => data.id === el.id
  )

  return (
    <div className={styles['product-info']}>
      <div className={styles['product-info__side']}>
        <img src={data.image} alt={data.category} />
      </div>
      <div className={styles['product-info__side']}>
        <div className={styles['product__title']}>{data.title}</div>
        <div className={styles['product-palette']}>
          <div className={styles['product-palette__title']}>Color</div>
          <div className={styles['product-palette__colors']}>
            {colors.map((el: string, idx: number) => (
              <div
                key={idx}
                className={styles['product-palette__square']}
                style={{ backgroundColor: `#${el}` }}
              ></div>
            ))}
          </div>
        </div>
        <div className={styles['product__desc']}>
          {data.description.length > 175 && !expandDesc
            ? `${data.description.slice(0, 175)}...`
            : data.description}
          <span onClick={() => setExpandDesc(!expandDesc)}>
            &nbsp; {expandDesc ? ' Hide' : ' Read More'}
          </span>
        </div>
        <div className={styles['product__price']}>${data.price}</div>
        <div className={styles['product-actions']}>
          <Button className={styles['product-actions__btn']}>Buy Now</Button>
          <Button
            onClick={() =>
              chartStore.changeProductChart(normalizeChartProduct(data))
            }
            className={styles['product-actions__btn']}
            color={ButtonColor.secondary}
          >
            {isInCart ? 'Remove from Chart' : 'Add to Chart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default observer(ProductInfo)
