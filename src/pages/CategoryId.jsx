import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Spinner'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useFetch from '../hooks/useFetch'
import ProductContainer from '../components/ProductContainer'
import Paginate from '../components/Paginate'
import { useStateContext } from '../utils/ContextApi'

export default function CategoryId() {
  const [sortState, setSortState] = useState('none')
  const { categoryId } = useParams()
  const { error, data, loading } = useFetch(
    `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
  )
  const { currentPage, setCurrentPage } = useStateContext()
  const categoryName = data?.map((u) => u.category.name.split(' ')[0])

  const PER_PAGE = 10
  const offset = currentPage * PER_PAGE
  const currentPageData = data.slice(offset, offset + PER_PAGE)
  const pageIndex = Math.ceil(data.length / PER_PAGE)

  const sortMethods = {
    none: { method: (a, b) => null },
    asc: {
      method: (a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0),
    },
    desc: {
      method: (a, b) => (a.title < b.title ? 1 : a.title > b.title ? -1 : 0),
    },
    priceAsc: {
      method: (a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0),
    },
    priceDesc: {
      method: (a, b) => (a.price < b.price ? 1 : a.price > b.price ? -1 : 0),
    },
  }
  if (error) {
    console.log(error)
  }

  return (
    <div className='p-3' style={{ maxWidth: '992px', margin: '0 auto' }}>
      <h3 className='mt-5 py-md-5'>{categoryName[0]}</h3>
      <div className='d-flex justify-content-between mt-5'>
        <p className='small'>FILTER</p>
        <div>
          <span className='mx-2'>Sort By:</span>
          <select
            defaultValue={'none'}
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value='none'>None</option>
            <option value='asc'>{`Name: Ascending`}</option>
            <option value='desc'>{`Name: Descending`}</option>
            <option value='priceAsc'>{`Price: Low to High`}</option>
            <option value='priceDesc'>{`Price: High to Low`}</option>
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
    </div>
  )
}
