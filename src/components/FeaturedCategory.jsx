import React, { useContext } from 'react'
import LazyLoad from 'react-lazyload'
import { Image } from 'react-bootstrap'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Link } from 'react-router-dom'

import { formatCurrency } from '../utils/formatCurrency'
import Loading from './Spinner'

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext)
  return (
    <div className='d-flex justify-content-center align-items-center d-none d-md-flex'>
      <i className='bi-arrow-left-circle-fill' onClick={() => scrollPrev()}></i>
    </div>
  )
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext)
  return (
    <div className='d-flex justify-content-center align-items-center d-none d-md-flex'>
      <i
        className='bi-arrow-right-circle-fill'
        onClick={() => scrollNext()}
      ></i>
    </div>
  )
}

export default function FeaturedCategory({ error, data, loading }) {
  // cloth
  const featuredClothProducts = data.filter(
    (item) => item.category.name === 'Clothes'
  )
  const featuredCatList = featuredClothProducts.filter(
    (item) => item.price > 500
  )
  const featuredClothCategory = featuredCatList.slice(10, 16)
  const categoryName = featuredClothCategory?.map(
    (u) => u.category.name.split(' ')[0]
  )
  // furniture
  const featuredFurProducts = data.filter(
    (item) => item.category.name === 'Furniture'
  )
  const featuredCatListB = featuredFurProducts.filter(
    (item) => item.price > 500
  )
  const featuredFurCategory = featuredCatListB.slice(10, 16)
  const categoryNameB = featuredFurCategory?.map(
    (u) => u.category.name.split(' ')[0]
  )

  return (
    <div className='p-3' style={{ maxWidth: '992px', margin: '0 auto' }}>
      {loading && <Loading />}
      {(error || featuredClothCategory) && (
        <>
          {error && <p>{error.message}</p>}
          <h1 className='mt-5 text-center'>{categoryName[0]}</h1>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            style={{ overflow: 'hidden' }}
          >
            {featuredClothCategory.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <LazyLoad height={200} once>
                  <div
                    style={{ width: '280px', height: '420px' }}
                    className='mt-5 overflow-hidden bg-light rounded-4 p-5 text-center shadow-sm position-relative mx-3'
                  >
                    <LazyLoad height={200}>
                      <Image
                        src={product?.images[0]}
                        alt={product.title}
                        fluid
                      />
                    </LazyLoad>

                    <div className='position-absolute bottom-0 start-50 translate-middle-x'>
                      <p className='text-dark fw-bold'>{product.title}</p>
                      <p className='text-muted'>
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                </LazyLoad>
              </Link>
            ))}
          </ScrollMenu>
        </>
      )}
      {(error || featuredFurCategory) && (
        <>
          {error && <p>{error.message}</p>}
          <h1 className='mt-5 text-center'>{categoryNameB[0]}</h1>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            style={{ overflow: 'hidden' }}
          >
            {featuredFurCategory.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <LazyLoad height={200} once>
                  <div
                    style={{ width: '280px', height: '420px' }}
                    className='mt-5 overflow-hidden bg-light rounded-4 p-5 text-center shadow-sm position-relative mx-3'
                  >
                    <LazyLoad height={200}>
                      <Image
                        src={product?.images[0]}
                        alt={product.title}
                        fluid
                      />
                    </LazyLoad>

                    <div className='position-absolute bottom-0 start-50 translate-middle-x'>
                      <p className='text-dark fw-bold'>{product.title}</p>
                      <p className='text-muted'>
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                </LazyLoad>
              </Link>
            ))}
          </ScrollMenu>
        </>
      )}
    </div>
  )
}
