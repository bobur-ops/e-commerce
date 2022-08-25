import * as React from 'react'

import Card from '@components/Card'
import { IProduct } from '@myTypes/product'
import { Link } from 'react-router-dom'

import styles from './cards.module.scss'

type CardsType = {
  products: IProduct[]
}

const Cards: React.FC<CardsType> = ({ products }) => {
  return (
    <div className={styles.cards}>
      {products?.map((product: IProduct) => (
        <Link to={`product/${product.id}`} key={product.id}>
          <Card
            image={product.image}
            title={product.title}
            category={product.category}
            content={`$${product.price}`}
            subtitle={product.description}
          />
        </Link>
      ))}
    </div>
  )
}

export default Cards
