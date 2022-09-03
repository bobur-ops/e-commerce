import {
  getProductByCategory,
  getProducts,
  getProductsWithLimit,
} from '@api/fetchApi'
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection'
import rootStore from '@store/RootStore'
import { Meta } from '@utils/meta'
import { ILocalStore } from '@utils/useLocalStore'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

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
      getProductsByCategory: action.bound,
      toggleHasMore: action.bound,
      searchProduct: action.bound,
      fetchMore: action.bound,
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

  getProducts = async (): Promise<void> => {
    this._meta = Meta.loading

    try {
      const response = await getProductsWithLimit(this._limit)
      runInAction(() => {
        if (response.data.length < this._limit) {
          this._hasMore = false
        }
        this._meta = Meta.success
        this._products = normalizeCollection(
          response.data,
          (listItem) => listItem.id
        )
      })
      const searchTerm = rootStore.query.getParam('search')
      if (searchTerm) {
        this.searchProduct()
      }
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._products = getInitialCollectionModel()
      })
    }
  }

  getProductsByCategory = async (category: string): Promise<void> => {
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

  searchProduct = (): void => {
    const searchTerm = rootStore.query.getParam('search')
    if (searchTerm) {
      const newProducts = linearizeCollection(this._products).filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
      )

      if (newProducts.length) {
        this._products = normalizeCollection(
          newProducts,
          (listItem) => listItem.id
        )
      } else {
        this._meta = Meta.error
      }
    }
  }

  fetchMore = (): void => {
    this._limit = this._limit + 5
    if (this._hasMore && this._meta !== Meta.loading) {
      this.getProducts()
    }
  }

  toggleHasMore = (newValue: boolean): void => {
    this._hasMore = newValue
  }

  destroy(): void {
    // nothing to do
  }
}
