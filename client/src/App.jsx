
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashBoard from './pages/admin-view/dashboard'
import AdminFeaturs from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import Adminproducts from './pages/admin-view/products'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingHome from './pages/shopping-view/home'

function App() {

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='dashboard' element={<AdminDashBoard/>} />
          <Route path='features' element={<AdminFeaturs/>} />
          <Route path='orders' element={<AdminOrders/>} />
          <Route path='products' element={<Adminproducts/>} />
        </Route>
        <Route path='/shope' element={<ShoppingLayout/>}>
          <Route path='account' element={<ShoppingAccount/>} />
          <Route path='checkout' element={<ShoppingCheckout/>} />
          <Route path='home' element={<ShoppingHome/>} />
          <Route path='listing' element={<ShoppingListing/>} />
        </Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  )
}

export default App
