import React from 'react'
import FeaturedCategory from '../components/FeaturedCategory'
import FeaturedProducts from '../components/FeaturedProducts'
import Hero from '../components/Hero'
import useFetch from '../hooks/useFetch'

export default function Home() {
  const { loading, data, error } = useFetch(
    'https://api.escuelajs.co/api/v1/products'
  )
  return (
    <>
      <Hero error={error} data={data} loading={loading} />
      <FeaturedProducts error={error} data={data} loading={loading} />
      <FeaturedCategory error={error} data={data} loading={loading} />
    </>
  )
}
