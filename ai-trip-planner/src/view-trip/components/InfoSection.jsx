import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import { FaShareAlt } from "react-icons/fa";
import { getPlaceDetails ,PHOTO_REF_URL} from '../../service/GlobalApi';


function InfoSection({ trip }) {

    const [photoUrl ,setPhotoUrl] = useState();

    useEffect(()=>{
        trip&&GetPlacePhoto()
    },[trip])

    const GetPlacePhoto = async()=>{
        const data  = {
            textQuery: trip?.tripData?.location,
            
        }
        const result = await getPlaceDetails(data).then(resp=>{
            

            // console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl =  PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
            // console.log(PhotoUrl);
            setPhotoUrl(PhotoUrl)
            
        })
    }
    return (
        <div>
            <img src={photoUrl?photoUrl:"/placeholder.jpg"} alt="place" className='h-[340px] w-full  object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.tripData?.location}</h2>

                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full  text-gray-700 text-sm md:text-md'>📅 {trip.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full  text-gray-700 text-sm md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full  text-gray-700 text-sm md:text-md'>🧍 No. of Travellers:  {trip.userSelection?.traveller}</h2>
                    </div>
                </div>
                <Button ><FaShareAlt /></Button>
            </div>
        </div>
    )
}

export default InfoSection