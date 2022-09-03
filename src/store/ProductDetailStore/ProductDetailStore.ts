import { getProductByCategory, getProductById } from '@api/fetchApi'
import { IProductModel } from '@store/models/product'
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection'
import { Meta } from '@utils/meta'
import { ILocalStore } from '@utils/useLocalStore'
import { makeAutoObservable, observable, runInAction } from 'mobx'

import { IProductDetailStore } from './types'

type PrivateFields = '_meta' | '_currentProduct' | '_relatedProducts'

export default class ProductDetailStore
  implements IProductDetailStore, ILocalStore
{
  private _currentProduct: IProductModel | null = null
  private _meta: Meta = Meta.initial
  private _relatedProducts: CollectionModel<number, IProductModel> =
    getInitialCollectionModel()

  constructor() {
    makeAutoObservable<ProductDetailStore, PrivateFields>(this, {
      // observable
      _currentProduct: observable,
      _meta: observable,
      _relatedProducts: observable.ref,
    })
  }

  get currentProduct(): IProductModel | null {
    return this._currentProduct
  }

  get meta(): Meta {
    return this._meta
  }

  get relatedProducts(): IProductModel[] {
    return linearizeCollection(this._relatedProducts)
  }

  getProductById = async (id: string): Promise<void> => {
    this._meta = Meta.loading

    try {
      const response = await getProductById(id)
      runInAction(async () => {
        await this.getRelatedProducts(response.data.category)
        this._meta = Meta.success
        this._currentProduct = response.data
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._currentProduct = null
      })
    }
  }

  getRelatedProducts = async (category: string): Promise<void> => {
    this._meta = Meta.loading

    try {
      const response = await getProductByCategory(category)
      runInAction(() => {
        this._meta = Meta.success
        this._relatedProducts = normalizeCollection(
          response.data,
          (listItem) => listItem.id
        )
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._relatedProducts = getInitialCollectionModel()
      })
    }
  }

  destroy(): void {
    // nothing to do
  }
}
