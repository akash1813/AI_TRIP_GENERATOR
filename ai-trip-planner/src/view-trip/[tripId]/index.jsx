import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../service/firebaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {

    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId]);

    // used to get trip info from firebase

    const GetTripData= async()=>{
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            console.log("Document: ",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
        }
    } 
  return (
     <div className='pt-10 md:px-20 lg:px-24 xl:px-56'>

        {/* Information Section */}
            <InfoSection trip={trip} />

        {/* Recommended Hotels */}
            <Hotels trip={trip} />

        {/* Daily Plan */}

            <PlacesToVisit trip={trip} />

        {/* Footer */}
            <Footer trip={trip} />
     </div>
  )
}

export default Viewtrip