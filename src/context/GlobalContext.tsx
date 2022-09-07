import { createContext, useContext } from 'react'

import { GlobalContextType } from '@myTypes/product'
import rootStore from '@store/RootStore'
import { useLocalStore } from '@utils/useLocalStore'

const StoreContext = createContext<GlobalContextType | null>(null)

type StoreProviderType = {
  children: React.ReactNode
}

export const GlobalContextProvider: React.FC<StoreProviderType> = ({
  children,
}) => {
  const chartStore = rootStore.chart
  return (
    <StoreContext.Provider value={{ chartStore }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useGlobalStore = () => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error(
      'useProductContext must be called within ProductContext.Provider'
    )
  }

  return context
}
