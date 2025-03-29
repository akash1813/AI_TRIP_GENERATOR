import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';


function Header() {
     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(!open);

    const user = JSON.parse(localStorage.getItem('user'));
   
    useEffect(() => {
        console.log(user)
    }, [])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const GetUserProfile = (tokenInfo) => {

        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo? access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            setOpen(false)
            window.location.reload();

        })


    }


    return (
        <div className='p-3 shadow-sm flex justify-between items-center bg-gray-700'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10' src="/logo.svg" />
                <h2 className='text-xl text-white'>TravelBuddy</h2>

            </div>

            <div>
                {user ?
                    <div className='flex flex-row gap-3 justify-center items-center'>
                        <a href='/my-trips'>
                        <button variant="outline" className='h-full w-full bg-black text-white px-5 py-2 rounded-full '>My Trips</button>
                        </a>

                        <a href='/create-trip'>
                        <button variant="outline" className='h-full w-full bg-black text-white px-5 py-2 rounded-full '>+ Create Trip</button>
                        </a>
                        <Popover>
                            <PopoverHandler>
                                <img src={user?.picture} className='h-[40px] w-[40px] rounded-full mr-2 cursor-pointer' />
                            </PopoverHandler>
                            <PopoverContent>
                                
                                <h2 className='cursor-pointer text-black' onClick={()=>{
                                    googleLogout();
                                    localStorage.clear();
                                   window.location.reload();

                                }}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div> :
                    <div>
                        <button onClick={()=>setOpen(true)} className='h-full w-full bg-black text-white px-5 py-2 rounded-lg '>Sign In</button>
                    </div>
                }
            </div>

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
    )
}

export default Header