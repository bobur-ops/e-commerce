import { createContext, useContext } from 'react'

import ProductStore from '@store/ProductsStore'

export const ProductsStoreContext = createContext<ProductStore | null>(null)

export const useProductsStore = () => {
  const context = useContext(ProductsStoreContext)

  if (!context) {
    throw new Error(
      'useProductContext must be called within ProductContext.Provider'
    )
  }

  return context
}
