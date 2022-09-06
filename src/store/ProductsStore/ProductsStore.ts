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

type PrivateFields = '_products' | '_meta' | '_hasMore' | '_limit' | '_length'

export default class ProductsStore implements IProductStore, ILocalStore {
  private _products: CollectionModel<number, IProductModel> =
    getInitialCollectionModel()
  private _meta: Meta = Meta.initial
  private _limit: number = 5
  private _hasMore: boolean = true
  private _length: number = 0

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      // observables
      _products: observable.ref,
      _meta: observable,
      _limit: observable,
      _hasMore: observable,
      _length: observable,
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

  get totalProductsLength(): number {
    return this._length
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

  getProductsLength = async (): Promise<number> => {
    const response = await getProducts()

    return response.data.length
  }

  getProducts = async (): Promise<void> => {
    this._meta = Meta.loading

    try {
      const response = await getProductsWithLimit(this._limit)
      if (this._length === 0) {
        const forLength = await getProducts()
        this._length = forLength.data.length
      }
      runInAction(() => {
        if (response.data.length < this._limit) {
          this._hasMore = false
        }
        this._meta = Meta.success

        const searchTerm = rootStore.query.getParam('search')
        if (searchTerm) {
          const filteredData = this.searchProduct(response.data)
          this._products = normalizeCollection(
            filteredData,
            (listItem) => listItem.id
          )
        } else {
          this._products = normalizeCollection(
            response.data,
            (listItem) => listItem.id
          )
        }
      })
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

        const searchTerm = rootStore.query.getParam('search')
        if (searchTerm) {
          const filteredData = this.searchProduct(response.data)
          this._products = normalizeCollection(
            filteredData,
            (listItem) => listItem.id
          )
        } else {
          this._products = normalizeCollection(
            response.data,
            (listItem) => listItem.id
          )
        }
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._products = getInitialCollectionModel()
      })
    }
  }

  searchProduct = (data: IProductModel[]): IProductModel[] => {
    let newProducts: IProductModel[] = []
    const searchTerm = rootStore.query.getParam('search')
    if (searchTerm) {
      newProducts = data.filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
      )
    }

    return newProducts
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
