import React, { createContext, useContext, useState } from 'react'

import {
  getProductByCategory,
  getProductById,
  getProducts,
  getProductsWithLimit,
} from '@api/fetchApi'
import { IProduct, ProductContextType } from '@myTypes/product'

const ProductContext = createContext<ProductContextType | null>(null)

interface ProviderType {
  children: React.ReactNode
}

export const ProductProvider: React.FC<ProviderType> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null)
  const [limit, setLimit] = useState(5)
  const [hasMore, setHasMore] = useState(true)

  const fetchProducts = async () => {
    try {
      setError(false)
      setLoading(true)
      const response = await getProducts()

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
      const response = await getProductsWithLimit(limit)

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
      const response = await getProductByCategory(category)

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

  const fetchProductById = async (id: string) => {
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
        currentProduct,
        limit,
        hasMore,
        fetchProducts,
        searchProduct,
        fetchProductsByCategory,
        fetchWithLimit,
        fetchProductById,
        setLimit,
        setHasMore,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const ctx = useContext(ProductContext)
  if (!ctx) {
    throw new Error(
      'useProductContext must be called within ProductContext.Provider'
    )
  }
  return ctx
}
