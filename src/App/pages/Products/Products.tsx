import { useEffect, useRef, useState } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import { useProductContext } from '@context/ProductContext'
import { IProduct } from '@myTypes/product'

import { Cards, Search } from './components'
import styles from './products.module.scss'

const Products = () => {
  const {
    products,
    loading,
    error,
    fetchWithLimit,
    limit,
    changeLimit,
    hasMore,
  } = useProductContext()

  useEffect(() => {
    // fetchWithLimit(limit)

    // window.onscroll = function (ev) {
    //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //     alert("you're at the bottom of the page")
    //   }
    // }
    hasMore && fetchData()
  }, [limit])

  async function fetchData() {
    await fetchWithLimit(limit)

    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        changeLimit(limit + 5)
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
      {error && <div className="error-message">Can not find any products</div>}
      {!error && <Cards products={products} />}
      <Loader size={LoaderSize.l} loading={loading} />
      {!hasMore && <h2 className="error-message">You've seen all data</h2>}
    </div>
  )
}

export default Products
