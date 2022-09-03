import { createContext, useContext } from 'react'

import { StoreContextType } from '@myTypes/product'
import ChartStore from '@store/ChartStore'
import ProductDetailStore from '@store/ProductDetailStore'
import ProductStore from '@store/ProductStore'
import { useLocalStore } from '@utils/useLocalStore'

const StoreContext = createContext<StoreContextType | null>(null)

type StoreProviderType = {
  children: React.ReactNode
}

export const StoreProvider: React.FC<StoreProviderType> = ({ children }) => {
  const productStore = useLocalStore(() => new ProductStore())
  const productDetailStore = useLocalStore(() => new ProductDetailStore())
  const chartStore = useLocalStore(() => new ChartStore())

  return (
    <StoreContext.Provider
      value={{ productStore, productDetailStore, chartStore }}
    >
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
