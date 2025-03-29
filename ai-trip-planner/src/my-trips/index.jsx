
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

    const [userTrips,setUserTrips] = useState([]);

    useEffect(()=>{
        GetUserTrips()
    },[])

    const navigate = useNavigate();

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
      
        if (!user) {
          navigate('/');
          return;
        }
      
        setUserTrips([]); // Clear the trips before fetching new ones
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email)); // Fetch details of logged-in user
      
        const querySnapshot = await getDocs(q);
        const trips = []; // Temporary array to store trips
      
        querySnapshot.forEach((doc) => {
          trips.push(doc.data()); // Add each trip to the array
        });
      
        setUserTrips(trips); // Update the state once with the collected trips
      };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 pt-10'> 
        <h2 className='font-bold text-3xl'> My Trips</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
            
            {userTrips?.length>0?userTrips.map((trip,index)=>(
                
                <UserTripCardItem trip={trip} key={index} />
               
            ))  // skeletal effect
            : [1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[220px] w-full bg-blue-gray-50 animate-pulse rounded-xl mt-5'> 
                    </div>
            ))
        
        }
        </div>

    </div>
  )
}

export default MyTrips