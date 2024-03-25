import Layout from '@/components/layouts'
import Theme from '@/components/template/Theme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import './locales'
import store, { persistor } from './store'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Theme>
            <Layout />
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
