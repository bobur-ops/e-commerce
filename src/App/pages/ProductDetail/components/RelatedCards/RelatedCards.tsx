import React, { useEffect } from 'react'

import Card from '@components/Card'
import { useProductContext } from '@context/ProductContext'
import { IProduct } from '@myTypes/product'
import { Link } from 'react-router-dom'

import styles from './RelatedCards.module.scss'
interface Props {
  data: IProduct[]
}

const RelatedCards: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['related-cards__title']}>Related Items</div>
      <div className={styles['wrapper-cards']}>
        {data.length ? (
          data.map((el: IProduct) => (
            <Card
              id={el.id}
              image={el.image}
              subtitle={el.description}
              title={el.title}
              category={el.category}
              content={el.price}
            />
          ))
        ) : (
          <h1 className="error-message">No data</h1>
        )}
      </div>
    </div>
  )
}

export default RelatedCards
