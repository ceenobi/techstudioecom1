import React, { useState } from 'react'
import Loading from '../components/Spinner'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useStateContext } from '../utils/ContextApi'
import ProductContainer from '../components/ProductContainer'
import { Outlet, useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'

export default function Products() {
  const [sortState, setSortState] = useState('none')
  const { data, error, loading, currentPage, setCurrentPage } =
    useStateContext()
  const location = useLocation()

  const sortMethods = {
    none: { method: (a, b) => null },
    asc: {
      method: (a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0),
    },
    desc: {
      method: (a, b) => (a.price < b.price ? 1 : a.price > b.price ? -1 : 0),
    },
  }

  const PER_PAGE = 20
  const offset = currentPage * PER_PAGE
  const currentPageData = data.slice(offset, offset + PER_PAGE)
  const pageIndex = Math.ceil(data.length / PER_PAGE)

  return (
    <div className='p-3' style={{ maxWidth: '992px', margin: '0 auto' }}>
      {location.pathname === `/products` ? (
        <>
          <h3 className='text-center mt-5 py-md-5 mb-5'>
            Check out our collection of premium products.
          </h3>
          <div className='d-flex justify-content-between mb-4'>
            <p className='small'>FILTER</p>
            <div>
              <span className='mx-2'>Sort By:</span>
              <select
                defaultValue={'none'}
                onChange={(e) => setSortState(e.target.value)}
              >
                <option value='none'>None</option>
                <option value='asc'>{`Price: Low to High`}</option>
                <option value='desc'>{`Price: High to Low`}</option>
              </select>
            </div>
          </div>
          {loading && <Loading />}
          {(error || currentPageData) && (
            <>
              {error && <p>{error.message}</p>}
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter='30px'>
                  {currentPageData
                    .sort(sortMethods[sortState].method)
                    .map((product) => (
                      <ProductContainer key={product.id} {...product} />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
              <Paginate
                pageIndex={pageIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
