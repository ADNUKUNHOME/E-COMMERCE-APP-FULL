
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/lauout'
import AdminDashBoard from './pages/admin-view/dashboard'
import AdminFeaturs from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import Adminproducts from './pages/admin-view/products'

function App() {

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <h1>Header Component</h1>
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
      </Routes>
    </div>
  )
}

export default App
