import * as React from 'react'

import Card from '@components/Card'
import { IProduct } from '@myTypes/product'

import styles from './Cards.module.scss'

type CardsType = {
  products: IProduct[]
}

const Cards: React.FC<CardsType> = ({ products }) => {
  return (
    <div className={styles.cards}>
      {products.map((product: IProduct) => (
        <Card
          id={product.id}
          image={product.image}
          title={product.title}
          category={product.category}
          content={product.price}
          subtitle={product.description}
        />
      ))}
    </div>
  )
}

export default Cards
