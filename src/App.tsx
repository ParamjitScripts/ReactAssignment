import {WuPrimaryNavbar} from '@npm-questionpro/wick-ui-lib'
import './App.css'
import {AppRoutes} from './AppRoutes'

export const App: React.FC = () => {
  return (
    <>
      <div>
        <WuPrimaryNavbar
          Links={[
            <a key="home" href="/" className="active">
              Home
            </a>,
            <a key="product" href="/products">
              Product
            </a>,
          ]}
        />
        <AppRoutes />
      </div>
    </>
  )
}
