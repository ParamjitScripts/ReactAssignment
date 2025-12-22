import {Navigate, Route, Routes} from 'react-router'
import {ProductListScreen} from './screens/ProductListScreen'
import {Home} from './screens/Home'

export const AppRoutes: React.FC<React.PropsWithChildren> = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
