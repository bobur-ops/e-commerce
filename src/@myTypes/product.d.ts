import ChartStore from '@store/ChartStore'
import ProductDetailStore from '@store/ProductDetailStore'
import ProductStore from '@store/ProductStore'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type ProductContextType = {
  products: IProduct[]
  loading: boolean
  currentProduct: IProduct | null
  limit: number
  setLimit: Dispatch<SetStateAction<number>>
  setHasMore: Dispatch<SetStateAction<boolean>>
  hasMore: boolean
  error: boolean
  searchProduct: (term: string) => void
  fetchProductsByCategory: (category: string) => void
  fetchWithLimit: (limit: number) => void
  fetchProductById: (id: string) => void
  fetchProducts: () => void
}

export type StoreContextType = {
  productStore: ProductStore
  productDetailStore: ProductDetailStore
  chartStore: ChartStore
}
