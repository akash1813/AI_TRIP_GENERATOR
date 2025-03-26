import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { SelectBudgetOptions, SelectTravelsList } from '../constants/options';


function CreateTrip() {
    const [place, setPlace] = useState()

    const [formData,setFormData] = useState([])

    const handleInputChange = (name,value)=>{
         setFormData({
            ...formData,
            [name]: value
         })
    }

    useEffect(() => {
        console.log(formData)
    },[formData])

    return (
        
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 pt-10'>

            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className='mt-20 flex flex-col gap-9'>
                <div >
                    <h2 className='text-xl my-3 font-medium'>What is destination of your choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { 
                                setPlace(v);
                                handleInputChange('location',v)
                            }
                        }}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <input type='number' className='border-2 border-gray-200 rounded-lg w-full p-2' placeholder='Ex.3'
                    onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
                    />
                </div>


                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>

                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index} 
                            onClick={()=>handleInputChange('budget',item.title)}
                            className={
                                `p-4 border rounded-lg hover:shadow-lg
                                ${formData?.budget == item.title&&'shadow-lg border-black' }`
                            } >
                                <h2 className='text-4xl'>{item.icon} </h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>


                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>

                        {SelectTravelsList.map((item, index) => (
                            <div key={index}
                            onClick={()=>handleInputChange('traveller',item.people)}
                            className={
                                `p-4 border rounded-lg hover:shadow-lg
                                ${formData?.traveller == item.people&&'shadow-lg border-black' }`
                            }>
                                <h2 className='text-4xl'>{item.icon} </h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='my-10 justify-end flex'>
            <button className='mt-10 bg-black text-white px-5 py-2 rounded-lg w-30'>Generate Trip</button>
            </div>

        </div>
       
    )
}

export default CreateTrip