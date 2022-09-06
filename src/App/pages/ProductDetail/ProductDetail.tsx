import { useEffect } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import {
  ProductDetailStoreContext,
  useProductsDetailStore,
} from '@context/ProductDetailStore'
import { IProduct } from '@myTypes/product'
import ProductDetailStore from '@store/ProductDetailStore'
import { Meta } from '@utils/meta'
import { useLocalStore } from '@utils/useLocalStore'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import { ProductInfo, RelatedCards } from './components'

const ProductDetail = () => {
  const { id } = useParams()
  const productDetailStore = useLocalStore(() => new ProductDetailStore())

  useEffect(() => {
    id && productDetailStore.getProductById(id)
  }, [id])

  return (
    <ProductDetailStoreContext.Provider value={productDetailStore}>
      <div className="container">
        {productDetailStore.meta === Meta.loading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <>
            <ProductInfo data={productDetailStore.currentProduct} />
            {productDetailStore.currentProduct && (
              <RelatedCards
                data={productDetailStore.relatedProducts.filter(
                  (item: IProduct) =>
                    item.id !== productDetailStore.currentProduct?.id
                )}
              />
            )}
          </>
        )}
      </div>
    </ProductDetailStoreContext.Provider>
  )
}

export default observer(ProductDetail)
