import React from 'react'
import Image from 'react-bootstrap/Image'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

export default function ProductContainer({ id, images, title, price }) {
  return (
    <>
      <Link to={`/products/${id}`}>
        <div className='border border-2 p-5 text-center shadow-sm position-relative mx-auto productBox'>
          <LazyLoad height={200}>
            <Image src={images[0]} alt={title} className='text-center' fluid />
          </LazyLoad>
          <div className='position-absolute bottom-0 start-50 translate-middle-x'>
            <p className='text-dark fw-bold'>{title}</p>
            <p className='text-muted'>{formatCurrency(price)}</p>
          </div>
        </div>
      </Link>
    </>
  )
}
