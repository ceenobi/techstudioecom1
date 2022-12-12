import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'

export default function Paginate({ pageIndex, currentPage, setCurrentPage }) {
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' })
  }, [currentPage])

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  return (
    <div className='mt-5 d-flex justify-content-center align-items-center'>
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={pageIndex}
        breakLabel={'...'}
        breakClassName={'break-me'}
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
