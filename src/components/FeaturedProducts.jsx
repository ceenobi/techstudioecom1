import React from 'react'
import { Image } from 'react-bootstrap'
import Loading from './Spinner'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { formatCurrency } from '../utils/formatCurrency'

export default function FeaturedProducts({ error, data, loading }) {
  const featured = data.filter((product) => product.price > 900)
  const featuredProducts = featured.slice(0, 6)
  if (error) console.log(error)
  return (
    <div className='p-3' style={{ maxWidth: '992px', margin: '0 auto' }}>
      <h1 className='mt-5 text-center'>Featured Products</h1>
      <div className='mt-5'>
        {loading && <Loading />}
        {(error || featuredProducts) && (
          <>
            {error && <p>{error.message}</p>}
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter='30px'>
                {featuredProducts.map((product) => (
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <div
                      className='bg-light rounded-4 p-5 text-center shadow-sm position-relative mx-auto'
                      style={{ height: '420px', width: '100%' }}
                    >
                      <LazyLoad height={200}>
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          style={{ width: '100%', display: 'block' }}
                          className='text-center'
                        />
                      </LazyLoad>
                      <div className='position-absolute bottom-0 start-50 translate-middle-x'>
                        <p className='text-dark fw-bold'>{product.title}</p>
                        <p className='text-muted'>
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </>
        )}
      </div>
    </div>
  )
}
