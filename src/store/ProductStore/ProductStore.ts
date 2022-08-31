import { getProductByCategory, getProductsWithLimit } from '@api/fetchApi'
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection'
import rootStore from '@store/RootStore'
import { Meta } from '@utils/meta'
import { ILocalStore } from '@utils/useLocalStore'
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx'

import { IProductModel } from '../models/product/ProductItem'
import { IProductStore } from './types'

type PrivateFields = '_products' | '_meta' | '_hasMore' | '_limit'

export default class ProductStore implements IProductStore, ILocalStore {
  private _products: CollectionModel<number, IProductModel> =
    getInitialCollectionModel()
  private _meta: Meta = Meta.initial
  private _limit: number = 5
  private _hasMore: boolean = true

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      // observables
      _products: observable.ref,
      _meta: observable,
      _limit: observable,
      _hasMore: observable,
      // computeds
      products: computed,
      meta: computed,
      limit: computed,
      hasMore: computed,
      // actions
      getProducts: action.bound,
      incrementLimit: action.bound,
      getProductsByCategory: action.bound,
      toggleHasMore: action.bound,
      searchProduct: action.bound,
    })
  }

  get products(): IProductModel[] {
    return linearizeCollection(this._products)
  }

  get meta(): Meta {
    return this._meta
  }

  get hasMore(): boolean {
    return this._hasMore
  }

  get limit(): number {
    return this._limit
  }

  async getProducts(): Promise<void> {
    this._meta = Meta.loading

    try {
      const response = await getProductsWithLimit(this.limit)
      runInAction(() => {
        if (response.data.length < this.limit) {
          this._hasMore = false
        }

        this._meta = Meta.success
        this._products = normalizeCollection(
          response.data,
          (listItem) => listItem.id
        )
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._products = getInitialCollectionModel()
      })
    }
  }

  async getProductsByCategory(category: string): Promise<void> {
    this._meta = Meta.loading

    try {
      this._products = getInitialCollectionModel()
      const response = await getProductByCategory(category)

      runInAction(() => {
        this._meta = Meta.success
        this._products = normalizeCollection(
          response.data,
          (listItem) => listItem.id
        )
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._products = getInitialCollectionModel()
      })
    }
  }

  searchProduct(searchTerm: string): void {
    this._meta = Meta.initial
    if (searchTerm) {
      const newProducts = linearizeCollection(this._products).filter(
        (item: IProductModel) =>
          item.title.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      )
      this._products = normalizeCollection(
        newProducts,
        (listItem) => listItem.id
      )
    }
  }

  incrementLimit(newValue: number): void {
    this._limit = newValue
  }

  toggleHasMore(newValue: boolean): void {
    this._hasMore = newValue
  }

  destroy(): void {
    // nothing to do
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      // eslint-disable-next-line no-console
      console.log('Search value changed: ', search)
    }
  )
}
