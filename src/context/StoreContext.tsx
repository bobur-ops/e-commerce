import { createContext, useContext } from 'react'

import { StoreContextType } from '@myTypes/product'
import ProductStore from '@store/ProductStore'
import { useLocalStore } from '@utils/useLocalStore'

const StoreContext = createContext<StoreContextType | null>(null)

type ProductStoreProviderType = {
  children: React.ReactNode
}

export const ProductStoreProvider: React.FC<ProductStoreProviderType> = ({
  children,
}) => {
  const productStore = useLocalStore(() => new ProductStore())

  return (
    <StoreContext.Provider value={{ productStore }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useRootStore = () => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error(
      'useProductContext must be called within ProductContext.Provider'
    )
  }

  return context
}
