import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function Footer() {
  return (
    <div className='bg-light p-3 mt-5'>
      <div className='mt-5' style={{ maxWidth: '992px', margin: '0 auto' }}>
        <Row>
          <Col md={4}>
            <div className='text-center'>
              <i className='bi bi-box2'></i>
              <p className='fw-bold lead'>Fast, free delivery</p>
              <p className='small'>
                Choose free delivery or pick up available items at an EStore.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className='text-center'>
              <i className='bi bi-truck'></i>
              <p className='fw-bold lead'>Fast, and easy returns</p>
              <p className='small'>
                Complete your return online or take it to an EStore.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className='text-center'>
              <i className='bi bi-cash'></i>
              <p className='fw-bold lead'>Enjoy EStore on us</p>
              <p className='small'>
                And pay over time, interest-free when you choose to check out
                with EStore Card Monthly Installments.
              </p>
            </div>
          </Col>
        </Row>
        <hr className='w-100' />
        <div className='mt-3 text-center px-3'>
          <Row>
            <Col md={4}>
              <p className='small text-dark fw-bold'>Shop and Learn</p>
              <div className='small'>
                <p>Discount</p>
                <p>Discount</p>
                <p>Discount</p>
              </div>
            </Col>
            <Col md={4}>
              <p className='small text-dark fw-bold'>Store Locator</p>
              <div className='small'>
                <p>Discount</p>
                <p>Discount</p>
                <p>Discount</p>
              </div>
            </Col>
            <Col md={4}>
              <p className='small text-dark fw-bold'>About us</p>
              <div className='small'>
                <p>Discount</p>
                <p>Discount</p>
                <p>Discount</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
