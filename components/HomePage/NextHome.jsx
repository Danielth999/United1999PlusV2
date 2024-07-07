import React from 'react'
import HomeCarousel from '../Carousel/HomeCarousel'

const fetchCarousel = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carousel`)
  if (!res.ok) {
    throw new Error(`An error occurred: ${res.statusText}`)
  }
  const data = await res.json()
  return data

}

export default async function NextHome() {
  const carousel = await fetchCarousel()
  return (
    <>
    <HomeCarousel images={carousel} />
    </>
  )
}
