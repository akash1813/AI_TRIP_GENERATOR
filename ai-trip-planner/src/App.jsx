import React from 'react'
import {Route,Routes} from 'react-router-dom'
import CreateTrip from './createTrip/index'
import Hero from './components/custom/Hero'
import Viewtrip from './view-trip/[tripId]'

function App() {
 
  return (
    <div>
     
    <Routes>
     
      <Route path="/" element={<Hero />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/view-trip/:tripId" element={<Viewtrip />} />

    </Routes>
    </div>
  )
}

export default App
