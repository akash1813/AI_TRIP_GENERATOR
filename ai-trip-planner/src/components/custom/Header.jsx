import React from 'react'

function Header() {
    return (
        <div className='p-3 shadow-sm flex justify-between items-center bg-slate-200'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10' src="/logo.svg" />
                <h2 className='text-xl'>TravelBuddy</h2>
            </div>

            <div>
                <button className='h-full w-full bg-black text-white px-5 py-2 rounded-lg '>Sign In</button>
            </div>
        </div>
    )
}

export default Header