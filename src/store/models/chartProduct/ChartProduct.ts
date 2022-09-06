import { IProductModel } from '../product'

export interface IChartProduct {
  image: string
  title: string
  quantity: number
  id: number
  price: number
}

export const normalizeChartProduct = (item: IProductModel) => {
  const result = {
    ...item,
    quantity: 1,
  }
  return result
}
