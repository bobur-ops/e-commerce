import { useEffect } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import { useRootStore } from '@context/StoreContext'
import rootStore from '@store/RootStore'
import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit'
import { Meta } from '@utils/meta'
import { observer } from 'mobx-react-lite'

import { Cards, Search } from './components'
import styles from './Products.module.scss'

const Products = () => {
  useQueryParamsStoreInit()

  const { productStore } = useRootStore()

  useEffect(() => {
    fetchData()
    const search = rootStore.query.getParam('search')
  }, [])

  const fetchData = () => {
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
        Total Product <span>{productStore.products.length}</span>
      </div>
      {productStore.meta === Meta.error && (
        <div className={styles.error}>Can not find any products</div>
      )}
      {productStore.meta !== Meta.error && (
        <Cards products={productStore.products} />
      )}
      <Loader
        size={LoaderSize.l}
        loading={productStore.meta === Meta.loading}
      />
      {!productStore.hasMore && productStore.products.length && (
        <div className={styles.error}>You've seen all data</div>
      )}
    </div>
  )
}

export default observer(Products)
