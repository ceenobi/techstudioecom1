import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Image } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import ProductContainer from '../components/ProductContainer'
import ScrollingMenu from '../components/ScrollingMenu'
import Loading from '../components/Spinner'
import useFetch from '../hooks/useFetch'
import { useStateContext } from '../utils/ContextApi'
import { formatCurrency } from '../utils/formatCurrency'

export default function ProductId() {
  const [index, setIndex] = useState(0)
  const { productId } = useParams()
  const {
    data: dataProducts,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useStateContext()
  const { error, data, loading } = useFetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`
  )

  const relatedProduct = dataProducts.filter(
    (product) => product?.category?.name === data?.category?.name
  )
  const filterProductId = relatedProduct.filter((item) => item?.id !== data.id)
  const quantity = getItemQuantity(data.id)

  const addToCart = () => {
    increaseCartQuantity(data.id)
    toast.success(`${data.title} added to cart`)
  }

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' })
  }, [productId])

  return (
    <div className='p-3' style={{ maxWidth: '992px', margin: '0 auto' }}>
      <Row className='g-4 mt-5 justify-content-between'>
        {error && <p className='text-center'>{error.message}</p>}
        {loading && <Loading />}
        <Col md={4}>
          <h3 className=''>{data.title}</h3>
          <p className='lead'>{formatCurrency(data.price)}</p>
          <p className='lead fw-bold mt-3'>Category - {data.category?.name}</p>
          <p className='lead mt-3'>{data.description}</p>
          <div className='d-flex gap-2 mt-3'>
            <div className='d-flex align-items-center bg-light border border-2'>
              <span className='fs-4 px-2'>{quantity}</span>
              <div className='px-2'>
                <i className='bi bi-chevron-up' onClick={addToCart}></i>
                <i
                  className='bi bi-chevron-down'
                  onClick={() => decreaseCartQuantity(data.id)}
                ></i>
              </div>
            </div>
            <Button
              variant='primary'
              size='md'
              className='w-100 rounded-0'
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <LazyLoad height={200}>
            <Image
              src={data.images && data.images?.[index]}
              alt={data.title}
              fluid
            />
            <div className='d-flex g-4 mt-5'>
              {data.images?.map((image, i) => (
                <div key={i} className='me-2'>
                  <Image
                    src={image}
                    onMouseEnter={() => setIndex(i)}
                    style={{ width: '70px', height: '70px' }}
                    className={i === index ? 'border border-2 border-dark' : ''}
                  />
                </div>
              ))}
            </div>
          </LazyLoad>
        </Col>
      </Row>
      <div className='mt-5'>
        <h3 className='text-center my-5'>Related Products</h3>
        <ScrollingMenu>
          {filterProductId?.slice(0, 10).map((product) => (
            <div className='me-3' key={product.id}>
              <ProductContainer {...product} />
            </div>
          ))}
        </ScrollingMenu>
      </div>
    </div>
  )
}
