import { createContext, useContext, useState } from 'react'

import {
  getProductByCategory,
  getProductById,
  getProducts,
  getProductsWithLimit,
} from '@api/fetchApi'
import { IProduct, ProductContextType } from '@myTypes/product'

const ProductContext = createContext<ProductContextType | null | any>(null)

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null)
  const [limit, setLimit] = useState(5)
  const [hasMore, setHasMore] = useState(true)

  const changeLimit = (limitNumber: number) => {
    setLimit(limitNumber)
  }

  const fetchProducts = async () => {
    try {
      setError(false)
      setLoading(true)
      const response: any = await getProducts()

      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      setError(true)
    }
  }

  const fetchWithLimit = async () => {
    try {
      setError(false)
      setLoading(true)
      const response: any = await getProductsWithLimit(limit)

      if (response.data.length < limit) {
        setHasMore(false)
      }
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      setError(true)
    }
  }

  const fetchProductsByCategory = async (category: string) => {
    try {
      setError(false)
      setLoading(true)
      const response: any = await getProductByCategory(category)

      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      setError(true)
    }
  }

  const searchProduct = (term: string) => {
    setError(false)
    if (term) {
      const newProducts = products.filter((item: IProduct) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      )

      if (newProducts.length) {
        setProducts(newProducts)
      } else {
        setError(true)
      }
    }
  }

  const fetchProductById = async (id: number) => {
    try {
      setError(false)
      setLoading(true)
      const response = await getProductById(id)

      await fetchProductsByCategory(response.data.category)

      setCurrentProduct(response.data)

      setLoading(false)
    } catch (error) {
      setError(true)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        fetchProductsByCategory,
        searchProduct,
        fetchWithLimit,
        currentProduct,
        fetchProductById,
        limit,
        changeLimit,
        hasMore,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)
