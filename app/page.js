import React from 'react'
import Hero from './components/HeroSection/Hero'
import AboutUs from './components/HeroSection/AboutUs'
import TopPick from './components/HeroSection/TopPick'

export default function page() {
  return <>
    <Hero />
    <TopPick />
    <AboutUs />
  </>
}