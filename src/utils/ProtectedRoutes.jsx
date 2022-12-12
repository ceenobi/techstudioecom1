import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoutes({ children }) {
  const location = useLocation()
  const { isAuthenticated } = useAuth0()

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate to={'/'} state={{ from: location }} />
      )}
    </>
  )
}
