import { useEffect } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import ProductStore from '@store/ProductStore'
import { Meta } from '@utils/meta'
import { useLocalStore } from '@utils/useLocalStore'
import { observer } from 'mobx-react-lite'

import { Cards, Search } from './components'
import styles from './Products.module.scss'

const Products = () => {
  const { meta, products, limit, getProducts, hasMore, incrementLimit } =
    useLocalStore(() => new ProductStore())

  useEffect(() => {
    hasMore && fetchData()
  }, [limit])

  const fetchData = () => {
    getProducts()

    window.onscroll = function () {
      if (
        window.innerHeight + window.scrollY + 50 >=
        document.body.offsetHeight
      ) {
        incrementLimit(limit + 5)
      }
    }
  }

  return (
    <div className="container">
      <div className={styles['products-top']}>
        <div className={styles['products-top__title']}>Products</div>
        <div className={styles['products-top__subtitle']}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </div>
      </div>
      <Search />
      <div className={styles['products-list__title']}>
        Total Product <span>{products.length}</span>
      </div>
      {meta === Meta.error && (
        <div className={styles.error}>Can not find any products</div>
      )}
      {meta !== Meta.error && <Cards products={products} />}
      <Loader size={LoaderSize.l} loading={meta === Meta.loading} />
      {!hasMore && products.length && (
        <div className={styles.error}>You've seen all data</div>
      )}
    </div>
  )
}

export default observer(Products)
