import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div
      className='bg-slate-50 h-screen w-screen'
      style={{
        backgroundImage: 'url("/Travel.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center mx-56 gap-9 py-16">
        <h1 className='font-extrabold text-[50px] text-center'>
          <span className='text-black'>Discover Your Next Adventure with AI: </span>
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-xl text-gray-800 text-center'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <button className='bg-black text-gray-400 px-5 py-2 rounded-lg'>
            Get Started, It's Free
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Hero