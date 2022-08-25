import { IProduct } from '@myTypes/product'
import axios from 'axios'
const API = axios.create({
  baseURL: 'https://fakestoreapi.com/',
})

export const getProducts = () => API.get<IProduct[]>('products')
export const getProductById = (id: number | string) => API.get(`products/${id}`)
export const getCategories = () => API.get('products/categories')
export const getProductByCategory = (category: string) =>
  API.get(`products/category/${category}`)
export const getProductsWithLimit = (limit: number) =>
  API.get(`products?limit=${limit}`)
