import {Navigate, Route, Routes} from 'react-router'
import {ProductListScreen} from './screens/product/ProductListScreen'
import {Home} from './screens/Home'
import ProductDetailScreen from './screens/product/components/productDetailScreen/ProductDetailScreen'

export const AppRoutes: React.FC<React.PropsWithChildren> = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListScreen />} />
      <Route path="/products/:productId" element={<ProductDetailScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
