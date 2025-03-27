import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/custom/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>

      <Header />


      <BrowserRouter>

        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
