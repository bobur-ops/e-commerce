import React, { useState } from 'react'

import { Button, ButtonColor } from '@components/Button'
import { IProduct } from '@myTypes/product'

import styles from './Product.module.scss'

interface Props {
  data: IProduct | null
}

const colors = ['151411', '314443', 'C5A26E', 'D8DBE0']

const ProductInfo: React.FC<Props> = ({ data }) => {
  const [expandDesc, setExpandDesc] = useState(false)
  if (data === null) return <></>

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
            className={styles['product-actions__btn']}
            color={ButtonColor.secondary}
          >
            Add to Chart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
