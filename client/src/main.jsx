import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store'
import { Toaster } from './components/ui/toaster'
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './Context/ThemeContext'



createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
         <ThemeProvider>
         <App />
         </ThemeProvider>
          
            <Toaster />
         </PersistGate>
      </Provider>
   </BrowserRouter>


)
