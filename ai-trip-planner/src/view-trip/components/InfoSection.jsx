import React from 'react'
import { Button } from "@material-tailwind/react";
import { FaShareAlt } from "react-icons/fa";

function InfoSection({ trip }) {
    return (
        <div>
            <img src='/placeholder.jpg' className='h-[340px] w-full  object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>

                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full  text-gray-500 text-sm md:text-md'>📅 {trip.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full  text-gray-500 text-sm md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full  text-gray-500 text-sm md:text-md'>🧍 No. of Travellers:  {trip.userSelection?.traveller}</h2>
                    </div>
                </div>
                <Button ><FaShareAlt /></Button>
            </div>
        </div>
    )
}

export default InfoSection