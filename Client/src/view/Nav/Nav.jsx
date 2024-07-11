import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Nav.module.css';
import { useAuth } from "../../context/AuthContext"

import arrayHide from "../../assets/flecha-izquierda2.png"
import arrayNoHide from "../../assets/flecha-correcta2.png"
import logo from "../../assets/organizer.jfif"

const Nav = () => {
  const { logout } = useAuth()
  const [ hide, setHide ] = useState(false)

  const handleLogout = () => {
    logout()
  }

  const handleHide = () => {
    setHide(!hide)
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            {/* <MountainIcon className="h-8 w-8" /> */}
            <img src={logo} alt='' className={styles.imgLogo}/>
            { !hide && <span className="text-sm font-medium">Organizer</span>}
          </Link>
          <nav className={styles.navMenu}>
            <Link to="/profile" className={!hide ? `${styles.link}` : `${styles.linkHide}`}>
              <UserIcon className="h-5 w-5" />
              { !hide && <span className="text-sm font-medium">Profile</span>}
            </Link>
            <Link to="/" className={!hide ? `${styles.link}` : `${styles.linkHide}`}>
              <HomeIcon className="h-5 w-5" />
              { !hide && <span className="text-sm font-medium">Home</span> }
            </Link>
            <Link to="/save" className={!hide ? `${styles.link}` : `${styles.linkHide}`}>
              <HeartIcon className="h-5 w-5" />
              { !hide && <span className="text-sm font-medium">Favorite</span> }
            </Link>
            <Link to="/help" className={!hide ? `${styles.link}` : `${styles.linkHide}`}>
              <HandHelpingIcon className="h-5 w-5" /> 
              { !hide && <span className="text-sm font-medium">Help</span> }
            </Link>
          </nav>
          <div className='logoutContainer'>
            <Link to="/registrarse" className={!hide ? `${styles.link}` : `${styles.linkHide}`}>
              <LogOutIcon className="h-5 w-5" />
              { !hide && <button onClick={handleLogout} className="text-sm font-medium">Logout</button> }
            </Link>
          </div>
        </div>

        <button 
        onClick={handleHide}
        className={styles.btnHide}
        >
          <img src={(!hide) ? arrayHide : arrayNoHide } alt='Hide' className={styles.imgHide}/>
        </button>
      </div>
    </div>
  );
}

export default Nav;

// Icon components remain unchanged
function HandHelpingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
      <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 13 6 6" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}