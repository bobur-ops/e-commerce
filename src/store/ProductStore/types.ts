export interface IProductStore {
  getProducts(): Promise<void>
  getProductsByCategory(category: string): Promise<void>
  searchProduct(): void
  fetchMore(): void
  toggleHasMore(newValue: boolean): void
}
