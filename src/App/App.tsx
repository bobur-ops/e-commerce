import Header from '@components/Header'
import { APP_ROUTES } from '@config/routes'
import { ProductProvider } from '@context/ProductContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'

const App = () => {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={APP_ROUTES.PRODUCTS} element={<Products />} />
          <Route path={APP_ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
