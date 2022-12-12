import React from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap'
import LazyLoad from 'react-lazyload'
import Loading from './Spinner'
import { Link } from 'react-router-dom'

export default function Hero({ error, data, loading }) {
  const heroProduct = data.slice(4, 5)
  return (
    <div className='bg-light py-5 px-3'>
      <Container
        className='mt-5'
        style={{ maxWidth: '992px', margin: '0 auto' }}
      >
        {loading && <Loading />}
        {(error || heroProduct) && (
          <>
            {error && <p>{error.message}</p>}
            {heroProduct.map((product) => (
              <Row
                className='mt-md-5 g-4 justify-content-between align-items-center'
                key={product.id}
              >
                <Col md={5}>
                  <div className='text-center text-md-start'>
                    <h1 className='mb-4 display-3 fw-bold'>For your needs.</h1>
                    <Link to={`/products/${product.id}`}>
                      <p className='lead fw-bold text-decoration-underline text-dark'>
                        Buy {product.title}
                      </p>
                    </Link>
                  </div>
                </Col>
                <Col md={5}>
                  <LazyLoad height={200}>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      style={{
                        height: '300px',
                        width: '100%',
                      }}
                      className='text-center'
                    />
                  </LazyLoad>
                </Col>
              </Row>
            ))}
          </>
        )}
      </Container>
    </div>
  )
}
