import { createContext, useContext } from 'react'

import ProductDetailStore from '@store/ProductDetailStore'

export const ProductDetailStoreContext =
  createContext<ProductDetailStore | null>(null)

export const useProductsDetailStore = () => {
  const context = useContext(ProductDetailStoreContext)

  if (!context) {
    throw new Error(
      'useProductContext must be called within ProductContext.Provider'
    )
  }

  return context
}
