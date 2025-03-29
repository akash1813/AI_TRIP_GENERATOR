import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

function PlaceCardItem({place}) {

    const [photoUrl ,setPhotoUrl] = useState();
    
        useEffect(()=>{
            place&&GetPlacePhoto() 
        },[place])
    
        const GetPlacePhoto = async()=>{
            const data  = {
                textQuery: place?.placeName,
                
            }
            const result = await getPlaceDetails(data).then(resp=>{
                
    
                const PhotoUrl =  PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
                setPhotoUrl(PhotoUrl)
                
            })
        }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
    <div className='border rounded-2xl p-3 mt-2 flex gap-3 hover:scale-105 transition-all cursor-pointer hover:shadow-md bg-gray-50'>
        <img src={photoUrl?photoUrl: "/placeholder.jpg"} className='h-[150px] w-[150px] rounded-xl object-cover' />

        <div className='flex flex-col gap-3'>

            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            
            <div className='flex flex-row gap-1 mt-1 '>
             <h2 className=' text-xs font-semibold text-gray-800'>Way: </h2>
            <h2 className=' text-xs text-gray-800'>  {place.timeToTravelFromHotel}</h2> 
           <h2 className=' text-xs text-gray-800 '>  {place.timeToTravelFromPreviousLocation}</h2>
           
            </div>
           {/* <Button size="sm" className='bg-gray-800 rounded-xl'><FaMapLocationDot /></Button> */}
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem