import { useEffect } from 'react'

import { Loader, LoaderSize } from '@components/Loader'
import { useProductContext } from '@context/ProductContext'
import { IProduct } from '@myTypes/product'
import { useParams } from 'react-router-dom'

import { ProductInfo, RelatedCards } from './components'
import styles from './ProductDetail.module.scss'

const ProductDetail = () => {
  const { id } = useParams()

  const { products, currentProduct, loading, error, fetchProductById } =
    useProductContext()

  useEffect(() => {
    id && fetchProductById(id)
  }, [id])

  return (
    <div className="container">
      {loading ? (
        <Loader size={LoaderSize.l} />
      ) : (
        <>
          <ProductInfo data={currentProduct} />
          {currentProduct !== null && (
            <RelatedCards
              data={products.filter(
                (item: IProduct) => item.id !== currentProduct.id
              )}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ProductDetail
