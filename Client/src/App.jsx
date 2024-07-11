import { Routes, Route, useLocation } from "react-router-dom"

import "./App.css"

import Nav from "./view/Nav/Nav.jsx"
import Registrarse from "./view/Registrarse/Registrarse.jsx"
import Login from "./view/Login/Login.jsx"
import Home from "./view/Home/Home.jsx"
import Add from "./view/Add/Add.jsx"
import Favorito from "./view/Favorito/Favorito.jsx"
import Help from "./view/Help/Help.jsx"
import Profile from "./view/Profile/Profile.jsx"

import ProteccionRutas from "./ProteccionRutas"
import Edit from "./view/Edit/Edit.jsx"

function App() {
  const location = useLocation();
  
  const isLogin = location.pathname === "/login"
  const isRegistrarse = location.pathname === "/registrarse"

  return (
        <div className="container">
          <div className="nav">
            { isLogin || isRegistrarse ? null : <Nav /> }
          </div>
          <div className="home">
            <Routes>
              <Route path="/registrarse" element={<Registrarse />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProteccionRutas/>}>
              <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add />} />
                <Route path="/candidatos/:_id" element={<Edit />} />
                <Route path="/save" element={<Favorito />} />
                <Route path="/help" element={<Help />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

            </Routes>  
          </div>
        </div>
  )
}

export default App