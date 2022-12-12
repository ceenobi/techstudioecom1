import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from '../utils/ProtectedRoutes'
// import Category from '../pages/Category'
// import CategoryId from '../pages/CategoryId'
// import Home from '../pages/Home'
// import ProductId from '../pages/ProductId'
// import Products from '../pages/Products'
// import Search from '../pages/Search'
import Footer from './Footer'
import Navbar from './Navbar'
import Loading from './Spinner'
const Home = lazy(() => import('../pages/Home'))
const Products = lazy(() => import('../pages/Products'))
const ProductId = lazy(() => import('../pages/ProductId'))
const Category = lazy(() => import('../pages/Category'))
const CategoryId = lazy(() => import('../pages/CategoryId'))
const Search = lazy(() => import('../pages/Search'))

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className='viewH animate__animated animate__fadeIn'>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='products'
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <Products />
                </ProtectedRoutes>
              </Suspense>
            }
          >
            <Route
              path=':productId'
              element={
                <Suspense fallback={<Loading />}>
                  <ProductId />
                </Suspense>
              }
            />
          </Route>
          <Route
            path='category'
            element={
              <Suspense fallback={<Loading />}>
                <Category />
              </Suspense>
            }
          >
            <Route
              path=':categoryId'
              element={
                <Suspense fallback={<Loading />}>
                  <CategoryId />
                </Suspense>
              }
            />
          </Route>
          <Route
            path='search'
            element={
              <Suspense fallback={<Loading />}>
                <Search />
              </Suspense>
            }
          />
          {/* <Route path='products' element={<Products />}>
            <Route path=':productId' element={<ProductId />} />
          </Route> */}
          {/* <Route path='category' element={<Category />}>
            <Route path=':categoryId' element={<CategoryId />} />
          </Route> */}
        </Routes>
      </main>
      <Footer />
    </>
  )
}
