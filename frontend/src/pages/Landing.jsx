import React, { useContext, useState } from 'react'
import {useNavigate}  from 'react-router-dom'
import {landingPageStyles} from '../assets/dummystyle'
import { LayoutTemplate, Menu, X } from 'lucide-react'
import {UserContext} from '../context/UserContext'
import { ProfileInfocard } from '../components/Cards'

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const {user} = useContext(UserContext);
  const navigate =useNavigate();

  return (
    <div className={landingPageStyles.container}>
      {/* Header */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
             <div className={landingPageStyles.logoIcon}>
                 <LayoutTemplate className={landingPageStyles.logoIconInner}/>
             </div>
             <span className={landingPageStyles.logoText}>
               Resume Builder
             </span>
          </div>
          {/* Mobile Menu */}
          <button className={landingPageStyles.mobileMenuButton}
            onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen?
              <X size={24} className={landingPageStyles.mobileMenuIcon}/>:
              <Menu size={24} className={landingPageStyles.mobileMenuIcon}/>}
          </button>
          {/* Desktop Nav */}
          <div className='hidden md:flex items-center'>
            {user ?(
              <ProfileInfocard/>
            ): (
              <button className={landingPageStyles.desktopAuthButton} onClick={() => setOpenAuthModal(true)}>
                <div className={landingPageStyles.desktopAuthButtonOverlay} />
                  <span className={landingPageStyles.desktopAuthButtonText}> Get Started </span>
              </button>
            )}
          </div>        
        </div>
         {/* Mobile Menu */}
         {mobileMenuOpen && (
          <div>
            <div className={landingPageStyles.mobileMenuContainer}>
              {user?(
                <div className={landingPageStyles.mobileUserInfo}>
                  <div className={landingPageStyles.mobileUserWelcome}>
                    Welcome Back
                  </div>
                  <button className={landingPageStyles.mobileDashboardButton} onClick={()=>{
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}>
                    Go to Dashboard
                  </button>
                </div>
              ):(
                <button className={landingPageStyles.mobileAuthButton}
                onClick={()=>{
                  setOpenAuthModal(true);
                  setMobileMenuOpen(false);
                }}>
                  Get Started
                </button>
              )}
            </div>
          </div>
         )}
      </header>
    
    </div>
  )
}

export default Landing

