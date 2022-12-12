import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Toaster } from 'react-hot-toast'
import RootLayout from './components/RootLayout'
import { StateContext } from './utils/ContextApi'

function App() {
  return (
    <>
      <StateContext>
        <PayPalScriptProvider deferLoading={true}>
          <Toaster />
          <RootLayout />
        </PayPalScriptProvider>
      </StateContext>
    </>
  )
}

export default App
