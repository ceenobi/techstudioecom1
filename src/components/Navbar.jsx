import React, { useState, useEffect } from 'react'
import {
  Container,
  Badge,
  Nav,
  Navbar,
  Offcanvas,
  Form,
  Image,
} from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useStateContext } from '../utils/ContextApi'
import ShopCart from './ShopCart'

export default function NavBar() {
  const [show, setShow] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { categories, cartQuantity, openCart } = useStateContext()
  const navigate = useNavigate()
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  const switchMode = () => {
    setShowSearch((showSearch) => !showSearch)
  }
  useEffect(() => {
    const getSearch = setTimeout(() => {
      if (query && query.length > 0) {
        navigate(`/search?query=${query}`)
        handleClose()
      }
    }, 2000)
    return () => clearTimeout(getSearch)
  }, [query])

  return (
    <Navbar fixed='top' className='shadow px-1' bg='dark'>
      <Container style={{ maxWidth: '992px', margin: '0 auto' }}>
        <div className='d-flex align-items-center'>
          <i className='bi bi-list d-lg-none' onClick={handleShow}></i>
          <Navbar.Brand as={NavLink} to='/' className='ms-3 ms-lg-0 text-white'>
            <i className='bi bi-ubuntu'></i>
          </Navbar.Brand>
          <Nav className='me-auto d-none d-lg-flex'>
            <Nav.Link as={NavLink} to='/' className='text-white'>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/products' className='text-white'>
              Products
            </Nav.Link>
            {categories.slice(0, 6).map((category) => (
              <Nav.Link
                as={NavLink}
                to={`/category/${category.id}`}
                className='text-white'
                key={category.id}
              >
                {category.name}
              </Nav.Link>
            ))}
          </Nav>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {' '}
              <NavLink to='/' onClick={handleClose}>
                <i
                  className='bi bi-ubuntu'
                  style={{ color: 'black', fontSize: '30px' }}
                ></i>
              </NavLink>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form className='d-flex mb-3'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
            <Nav>
              <Nav.Link as={NavLink} to='/' onClick={handleClose}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to='/products' onClick={handleClose}>
                Products
              </Nav.Link>
              {categories.slice(0, 6).map((category) => (
                <Nav.Link
                  as={NavLink}
                  to={`/category/${category.id}`}
                  key={category.id}
                  onClick={handleClose}
                >
                  {category.name}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <div className='d-flex align-items-center gap-3'>
          <i
            className='bi bi-search d-none d-lg-block'
            onClick={switchMode}
          ></i>
          {showSearch && (
            <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
          )}
          <i className='bi bi-cart-fill position-relative' onClick={openCart}>
            {cartQuantity > 0 && (
              <Badge
                pill
                bg='primary'
                className='position-absolute top-0 start-100 translate-middle'
              >
                {cartQuantity}
              </Badge>
            )}
          </i>
          <ShopCart />

          {isAuthenticated ? (
            <div className='d-flex align-items-center gap-2'>
              <Image
                src={user?.picture}
                alt={user.nickname}
                style={{ width: '30px', height: '30px' }}
                roundedCircle
              />
              <p
                onClick={() => logout({ returnTo: window.location.origin })}
                className='text-white align-self-center mt-2'
                style={{ cursor: 'pointer' }}
              >
                Logout
              </p>
            </div>
          ) : (
            <i
              className='bi bi-person-circle'
              onClick={() => loginWithRedirect()}
            ></i>
          )}
        </div>
      </Container>
    </Navbar>
  )
}
