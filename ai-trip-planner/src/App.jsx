import React from 'react'
import {Route,Routes} from 'react-router-dom'
import CreateTrip from './createTrip/index'
import Hero from './components/custom/Hero'
import Viewtrip from './view-trip/[tripId]'
import MyTrips from './my-trips'

function App() {
 
  return (
    <div>
     
    <Routes>
     
      <Route path="/" element={<Hero />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/view-trip/:tripId" element={<Viewtrip />} />
      <Route path="/my-trips" element={<MyTrips />} />

    </Routes>
    </div>
  )
}

export default App
