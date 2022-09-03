import { IChartProduct } from '@store/models/chartProduct'
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection'
import { ILocalStore } from '@utils/useLocalStore'
import { action, computed, makeObservable, observable, reaction } from 'mobx'

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
      _chartProducts: observable.ref,
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
    // this._autosaveToLocalStorage()
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

    let isNew = true
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === product.id) isNew = false
    }
    if (isNew) {
      const newProducts = [...products, product]
      this._chartProducts = normalizeCollection(
        newProducts,
        (listItem) => listItem.id
      )
    } else {
      const newProducts = products.filter(
        (el: IChartProduct) => el.id !== product.id
      )
      this._chartProducts = normalizeCollection(
        newProducts,
        (listItem) => listItem.id
      )
    }
  }

  increaseItemCount = (id: number) => {
    const products = linearizeCollection(this._chartProducts)
    const newProducts = products.map((el: IChartProduct) => ({
      ...el,
      quantity: id === el.id ? el.quantity + 1 : el.quantity,
    }))
    this._chartProducts = normalizeCollection(
      newProducts,
      (listItem) => listItem.id
    )
  }
  decreaseItemCount = (id: number) => {
    const products = linearizeCollection(this._chartProducts)
    const newProducts = products.map((el: IChartProduct) => ({
      ...el,
      quantity: id === el.id && el.quantity > 1 ? el.quantity - 1 : el.quantity,
    }))
    this._chartProducts = normalizeCollection(
      newProducts,
      (listItem) => listItem.id
    )
  }

  destroy() {
    // this._autosaveToLocalStorage()
  }

  // private readonly _autosaveToLocalStorage = reaction(
  //   () => this._chartProducts,
  //   (data) => {
  //     // eslint-disable-next-line no-console
  //     console.log('Reaction', data)
  //     // localStorage.setItem('_chartProducts', JSON.stringify(products))
  //   }
  // )
}
