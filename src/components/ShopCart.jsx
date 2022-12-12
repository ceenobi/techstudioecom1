import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useStateContext } from '../utils/ContextApi'
import { formatCurrency } from '../utils/formatCurrency'
import Loading from './Spinner'
import CartItem from './CartItem'
import Checkout from './Checkout'

export default function ShopCart() {
  const { data, error, loading, isOpen, closeCart, cartItems } =
    useStateContext()

  const getTotal = cartItems.reduce((total, cartItem) => {
    const totalItem = data.find((i) => i.id === cartItem.id)
    return total + (totalItem?.price || 0) * cartItem.quantity
  }, 0)
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length < 1 ? (
          <div>
            <p className='lead'>Oops your shopping cart is empty. </p>
          </div>
        ) : (
          <>
            {error && <p>{error.message}</p>}
            <Stack gap={3} className='h-100 position-relative'>
              {cartItems.map((item, index) => (
                <CartItem key={index} {...item} />
              ))}
              <div className='ms-auto position-absolute bottom-0 end-0 w-100'>
                {loading && <Loading />}
                <div className='d-flex justify-content-between mb-3 fw-bold fs-5 text-center'>
                  Subtotal:
                  <span className='text-muted'>{formatCurrency(getTotal)}</span>
                </div>
                <Checkout getTotal={getTotal} />
              </div>
            </Stack>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}
