import { useEffect } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import { useRootStore } from '@context/StoreContext'
import { IProduct } from '@myTypes/product'
import { Meta } from '@utils/meta'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import { ProductInfo, RelatedCards } from './components'

const ProductDetail = () => {
  const { id } = useParams()
  const { productDetailStore } = useRootStore()

  useEffect(() => {
    id && productDetailStore.getProductById(id)
  }, [id])

  return (
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
  )
}

export default observer(ProductDetail)
