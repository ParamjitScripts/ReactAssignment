import {Navigate, Route, Routes} from 'react-router'
import {ProductListScreen} from './screens/ProductListScreen'

export const AppRoutes: React.FC<React.PropsWithChildren> = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductListScreen />} />

      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  )
}
