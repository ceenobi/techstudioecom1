import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loading from './Spinner'
import { useAuth0 } from '@auth0/auth0-react'

export default function Checkout({ getTotal }) {
  const [openPayment, setOpenPayment] = useState(false)
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const amount = getTotal
  const currency = 'USD'
  const style = { layout: 'vertical' }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])

    return (
      <>
        {showSpinner && isPending && <Loading />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              toast.success('Payment successfull')
              navigate('/success')
            })
          }}
        />
      </>
    )
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          {openPayment ? (
            <PayPalScriptProvider
              options={{
                'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
                components: 'buttons',
                currency: 'USD',
                'disable-funding': 'credit,card,p24',
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          ) : (
            <Button
              className='w-100 border-0 rounded-0 bg-black mb-3'
              size='lg'
              onClick={() => setOpenPayment(true)}
            >
              Checkout
            </Button>
          )}
        </>
      ) : (
        <p className='lead text-dark'>Pls sign in to continue purchase</p>
      )}
    </>
  )
}
