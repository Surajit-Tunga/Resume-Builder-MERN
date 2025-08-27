import React, { useState } from 'react'
import {landingPageStyles} from '../assets/dummystyle'
import { LayoutTemplate, Menu, X } from 'lucide-react'


const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          
        </div>
      </header>
    
    </div>
  )
}

export default Landing

