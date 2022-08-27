import { useEffect } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import { useProductContext } from '@context/ProductContext'

import { Cards, Search } from './components'
import styles from './Products.module.scss'

const Products = () => {
  const { products, loading, error, fetchWithLimit, limit, setLimit, hasMore } =
    useProductContext()

  useEffect(() => {
    hasMore && fetchData()
  }, [limit])

  function fetchData() {
    fetchWithLimit(limit)

    window.onscroll = function () {
      if (
        window.innerHeight + window.scrollY + 5 >=
        document.body.offsetHeight
      ) {
        setLimit(limit + 5)
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
      {error && <div className={styles.error}>Can not find any products</div>}
      {!error && <Cards products={products} />}
      <Loader size={LoaderSize.l} loading={loading} />
      {!hasMore && products.length && (
        <div className={styles.error}>You've seen all data</div>
      )}
    </div>
  )
}

export default Products
