export interface IProductDetailStore {
  getProductById(id: string): void
  getRelatedProducts(category: string): void
}
