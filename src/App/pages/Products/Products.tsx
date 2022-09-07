import { useEffect } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import { ProductsStoreContext } from '@context/ProductsContext'
import ProductStore from '@store/ProductsStore'
import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit'
import { Meta } from '@utils/meta'
import { useLocalStore } from '@utils/useLocalStore'
import { observer } from 'mobx-react-lite'

import { Cards, Search } from './components'
import styles from './Products.module.scss'

const Products = () => {
  useQueryParamsStoreInit()

  const productStore = useLocalStore(() => new ProductStore())

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    productStore.getProducts()

    window.onscroll = function () {
      if (
        window.innerHeight + window.scrollY + 50 >=
          document.body.offsetHeight &&
        productStore.meta !== Meta.loading
      ) {
        productStore.fetchMore()
      }
    }
  }

  return (
    <ProductsStoreContext.Provider value={productStore}>
      <div className="container">
        <div className={styles['products-top']}>
          <div className={styles['products-top__title']}>Products</div>
          <div className={styles['products-top__subtitle']}>
            We display products based on the latest products we have, if you
            want to see our old products please enter the name of the item
          </div>
        </div>
        <Search />
        <div className={styles['products-list__title']}>
          Total Product <span>{productStore.totalProductsLength}</span>
        </div>
        {!productStore.products.length && productStore.meta !== Meta.loading ? (
          <div className={styles.error}>Can not find any products</div>
        ) : null}
        {productStore.meta !== Meta.error ? (
          <Cards products={productStore.products} />
        ) : null}
        <Loader
          size={LoaderSize.l}
          loading={productStore.meta === Meta.loading}
        />
        {!productStore.hasMore && productStore.products.length ? (
          <div className={styles.error}>You've seen all data</div>
        ) : null}
      </div>
    </ProductsStoreContext.Provider>
  )
}

export default observer(Products)
