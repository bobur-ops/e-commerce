import { IProductModel } from '@store/models/product'

export interface IProductStore {
  getProducts(): Promise<void>
  getProductsByCategory(category: string): Promise<void>
  searchProduct(data: IProductModel[]): IProductModel[]
  fetchMore(): void
  toggleHasMore(newValue: boolean): void
}
