import Footer from '@components/Footer/Footer'
import Header from '@components/Header'
import { APP_ROUTES } from '@config/routes'
import { StoreProvider } from '@context/StoreContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Chart from './pages/Chart/Chart'
import Empty from './pages/Empty/Empty'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={APP_ROUTES.PRODUCTS} element={<Products />} />
          <Route path={APP_ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={APP_ROUTES.CHART} element={<Chart />} />
          <Route path="*" element={<Empty />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
