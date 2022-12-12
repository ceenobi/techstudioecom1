import React, { createContext, useContext, useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

const Context = createContext()

let initialState = []

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState(initialState)
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const { error, data, loading } = useFetch(
    `https://api.escuelajs.co/api/v1/products`
  )
  const { data: categories } = useFetch(
    'https://api.escuelajs.co/api/v1/categories'
  )

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('updatedBag'))
    if (cartData) {
      setCartItems(cartData)
    }
  }, [])

  useEffect(() => {
    if (cartItems !== initialState) {
      localStorage.setItem('updatedBag', JSON.stringify(cartItems))
    }
  }, [cartItems])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        openCart,
        closeCart,
        isOpen,
        error,
        data,
        loading,
        categories,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        currentPage,
        setCurrentPage,
        pageCount,
        setPageCount,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
