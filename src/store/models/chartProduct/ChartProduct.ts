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
    image: item.image,
    title: item.title,
    quantity: 1,
    id: item.id,
    price: item.price,
  }
  return result
}
