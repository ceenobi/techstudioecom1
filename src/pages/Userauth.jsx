import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loading from '../components/Spinner'

export default function Userauth() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const switchMode = () => {
    setIsSignUp((isSignUp) => !isSignUp)
  }

  return (
    <div className='p-3' style={{ maxWidth: '992px', margin: '0 auto' }}>
      <h3 className='text-center text-md-start mt-5 py-3 py-md-5 mb-5'>
        Sign in for faster checkout.
      </h3>
      <Row className='justify-content-center  g-4'>
        <Col md={5}>
          <div>
            <h4>{isSignUp ? 'Sign up' : 'Log in'}</h4>
            <Form style={{ maxWidth: '300px' }}>
              {isSignUp && (
                <Form.Group className='mb-3' controlId='formBasicName'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='username'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              {isSignUp && (
                <Form.Group className='mb-3' controlId='formBasicAvatar'>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col md={1}>
          <div
            className='h-100 bg-secondary d-none d-md-block'
            style={{ width: '.5px' }}
          ></div>
        </Col>
        <Col md={5}>
          <div>
            <h4 className='mb-4'>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <span
                className='text-primary mx-3'
                onClick={switchMode}
                style={{ cursor: 'pointer' }}
              >
                {isSignUp ? 'Login' : 'Sign up'}
              </span>
            </h4>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                variant='primary'
                type='submit'
                size='lg'
                className='w-100 rounded-0'
              >
                {isSignUp ? 'Sign up' : 'Login'}
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}
