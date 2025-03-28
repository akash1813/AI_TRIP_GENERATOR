import React from 'react'

function Footer() {
  return (
    <div className='w-50 h-7  justify-center items-center bg-black'>
        <h2 className='text-center font-semibold text-gray-500 mt-10'>© {new Date().getFullYear()} TravelBuddy. All rights reserved.</h2>
    </div>
  )
}

export default Footer