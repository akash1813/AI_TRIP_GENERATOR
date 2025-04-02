import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/options';
import { chatSession } from '../service/AIMODAL';
import { FcGoogle } from "react-icons/fc";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';




function CreateTrip() {
    // const [place, setPlace] = useState()

    const [formData, setFormData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleOpen = () => setOpen(!open);
    const handleInputChange = (name, value) => {

        if (name == 'noOfDays' && value > 5) {
            console.log('Please enter a number less than 5')
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])


    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const OnGenerateTrip = async () => {

        const user = localStorage.getItem('user');

        if (!user) {
            setOpen(true)
            return;
        }


        if (formData?.noOfDays > 5 && (!formData?.location || !formData?.budget || !formData?.traveller)) {
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveller}', formData?.traveller)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)
            



        const result = await chatSession.sendMessage(FINAL_PROMPT)
        console.log(result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    }

    const GetUserProfile = (tokenInfo) => {

        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo? access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            setOpen(false)
            OnGenerateTrip();

        })


    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId,
        })

        setLoading(false);
        navigate('/view-trip/'+docId);
    }

    return (

        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 pt-10'>

            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className='mt-20 flex flex-col gap-9'>
                <div >
                    <h2 className='text-xl my-3 font-medium'>What is destination of your choice?</h2>
                    {/* <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { 
                                setPlace(v);
                                handleInputChange('location',v)
                            }
                        }}
                    /> */}

                    <input type='text' className='border-2 border-gray-200 rounded-lg w-full p-2' placeholder='Ex. Paris'


                        onChange={(e) => {

                            // setPlace(e);
                            handleInputChange('location', e.target.value);
                        }
                        }
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <input type='number' className='border-2 border-gray-200 rounded-lg w-full p-2' placeholder='Ex.3'
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>


                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>

                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={
                                    `p-4 border rounded-lg hover:shadow-lg
                                ${formData?.budget == item.title && 'shadow-lg border-black'}`
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
                                onClick={() => handleInputChange('traveller', item.people)}
                                className={
                                    `p-4 border rounded-lg hover:shadow-lg
                                ${formData?.traveller == item.people && 'shadow-lg border-black'}`
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

                <button disabled={loading} onClick={OnGenerateTrip} className='mt-10 bg-black text-white px-5 py-2 rounded-lg w-30'>
                    {loading ?

                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
                        :
                        'Generate Trip'

                    }
                </button>


                <Dialog open={open} handler={handleOpen}>
                    {/* <DialogHeader>Its a simple dialog.</DialogHeader> */}
                    <DialogBody>
                        <div className='flex flex-col items-center justify-center'>
                            <img className='w-10 h-10' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                            <h2 className='text-xl text-black flex justify-center font-semibold'>Sign In with Google</h2>
                        </div>
                        <p className='justify-center flex text-lg font-semibold'>Sign in to app with Google authentication</p>

                    </DialogBody>


                    <Button onClick={login} variant="gradient" color="black" className=' mx-40 items-center px-20 flex flex-row font-bold mb-2' >



                        <FcGoogle className='h-6 w-7 mx-2' />
                        SignIn


                    </Button>

                </Dialog>

            </div>

        </div>

    )
}

export default CreateTrip