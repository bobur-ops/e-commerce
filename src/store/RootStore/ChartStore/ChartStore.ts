import { IChartProduct } from '@store/models/chartProduct'
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection'
import { ILocalStore } from '@utils/useLocalStore'
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from 'mobx'

import { IChartStore } from './types'

type PrivateFields = '_chartProducts'

export default class ChartStore implements IChartStore, ILocalStore {
  private _chartProducts: CollectionModel<number, IChartProduct> =
    normalizeCollection(
      JSON.parse(localStorage.chartProducts),
      (listItem) => listItem.id
    ) || getInitialCollectionModel()

  constructor() {
    makeObservable<ChartStore, PrivateFields>(this, {
      // observables
      _chartProducts: observable,
      // computed
      chartProducts: computed,
      totalPrice: computed,
      totalAmount: computed,
      // actions
      changeProductChart: action.bound,
      increaseItemCount: action.bound,
      decreaseItemCount: action.bound,
    })
    reaction(
      () => this._chartProducts,
      (data) => {
        localStorage.chartProducts = JSON.stringify(linearizeCollection(data))
      }
    )
  }

  get chartProducts(): IChartProduct[] {
    return linearizeCollection(this._chartProducts)
  }

  get totalPrice(): number {
    const products = linearizeCollection(this._chartProducts)
    const price = products.reduce((acc: number, curValue) => {
      return acc + curValue.price * curValue.quantity
    }, 0)
    return Number(price.toFixed(2))
  }

  get totalAmount(): number {
    return linearizeCollection(this._chartProducts).length
  }

  changeProductChart = (product: IChartProduct): void => {
    const products = linearizeCollection(this._chartProducts)

    // eslint-disable-next-line no-console
    console.log(products.some((el: IChartProduct) => el.id === product.id))

    const isProductInList = products.some(
      (el: IChartProduct) => el.id === product.id
    )

    const updatedList = isProductInList
      ? products.filter((el: IChartProduct) => el.id !== product.id)
      : [...products, product]
    this._chartProducts = normalizeCollection(
      updatedList,
      (listItem) => listItem.id
    )
  }

  increaseItemCount = (id: number) => {
    this._chartProducts.entities[id].quantity += 1
  }
  decreaseItemCount = (id: number) => {
    if (this._chartProducts.entities[id].quantity > 1) {
      this._chartProducts.entities[id].quantity -= 1
    }
  }

  destroy(): void {}
}
