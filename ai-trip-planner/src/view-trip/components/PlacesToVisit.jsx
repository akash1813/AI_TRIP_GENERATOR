import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h1 className='font-bold text-xl mt-5'>Places to Visit</h1>

      <div className='mt-5'>
        {trip?.tripData?.itinerary &&
          Object.keys(trip.tripData.itinerary).map((dayKey, index) => {
            const day = trip.tripData.itinerary[dayKey];
            return (
              <div key={index} className='mb-5 '>
                
                <div className='flex flex-col gap-2'>
                <h2 className='font-semibold text-lg'>{`Day ${index + 1}: ${day.theme}`} 📍</h2>
                <h2 className='text-blue-300  text-sm' >🕗 {`Best Time to Visit: ${day.bestTimeToVisit}`}</h2>
                </div>

                <div className='grid md:grid-cols-2 gap-5 mt-4'>
                  {day.activities.map((activity, activityIndex) => (
                     
                     <div key={activityIndex} >
                         
                          <PlaceCardItem place={activity} />
                        </div>
                  ))}

                  </div>
               
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlacesToVisit;