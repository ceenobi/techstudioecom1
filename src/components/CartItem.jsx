import React from 'react'
import { Stack, Image } from 'react-bootstrap'
import { useStateContext } from '../utils/ContextApi'
import { formatCurrency } from '../utils/formatCurrency'

export default function CartItem({ id, quantity }) {
  const { removeFromCart, data } = useStateContext()
  const item = data.find((it) => it.id === id)
  if (item == null) return null
  return (
    <>
      <Stack
        direction='horizontal'
        gap={2}
        className='d-flex align-items-center'
      >
        <Image
          src={item.images[0]}
          alt={item.title}
          style={{ width: '125px', height: '75px', objectFit: 'cover' }}
        />
        <div className='me-auto'>
          <div>
            {item.title}
            {quantity > 1 && (
              <span className='text-muted mx-2' style={{ fontSize: '.65rem' }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className='text-muted' style={{ fontSize: '.75rem' }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <i className='bi bi-x text-dark' onClick={() => removeFromCart(id)}></i>
      </Stack>
    </>
  )
}
