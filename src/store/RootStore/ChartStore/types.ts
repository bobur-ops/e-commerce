import { IChartProduct } from '@store/models/chartProduct'

export interface IChartStore {
  changeProductChart(product: IChartProduct): void
  increaseItemCount(id: number): void
  decreaseItemCount(id: number): void
}
