import React from 'react'
import { useLocation } from 'react-router-dom'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Paginate from '../components/Paginate'
import Loading from '../components/Spinner'
import { useStateContext } from '../utils/ContextApi'
import ProductContainer from '../components/ProductContainer'

export default function Search() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query')
  const { data, error, loading, currentPage, setCurrentPage } =
    useStateContext()

  const PER_PAGE = 15
  const offset = currentPage * PER_PAGE
  const currentPageData = data.slice(offset, offset + PER_PAGE)
  const pageIndex = Math.ceil(data.length / PER_PAGE)

  const filteredData = currentPageData.filter((res) => {
    const filter = res.title === query || res.category?.name === query
    if (query === '') {
      return res
    } else {
      return (
        res.title.toLowerCase().includes(query) ||
        res.category?.name.toLowerCase().includes(query) ||
        filter
      )
    }
  })

  return (
    <div className='p-3' style={{ maxWidth: '992px', margin: '0 auto' }}>
      <div className='mt-5'>
        <h3 className='py-5 mb-5'>
          {' '}
          Search result:{' '}
          <span className='fs-5 text-muted'>{`${filteredData.length} products found for "${query}"`}</span>
        </h3>
        {loading && <Loading />}
        {(error || filteredData) && (
          <>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter='30px'>
                {filteredData.map((product) => (
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
    </div>
  )
}
