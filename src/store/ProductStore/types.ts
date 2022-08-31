export interface IProductStore {
  getProducts(): Promise<void>
  // getProductsByCategory(category: string): Promise<void>
}
