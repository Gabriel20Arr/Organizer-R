import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter} from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.jsx"
import { CandidatosProvider } from "./context/CandidatosContext"
import { FavProvider } from "./context/FavoriteContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CandidatosProvider>
          <FavProvider>
            <App />
          </FavProvider>
        </CandidatosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
