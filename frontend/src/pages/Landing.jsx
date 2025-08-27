import React, { useContext, useState } from 'react'
import {useNavigate}  from 'react-router-dom'
import {landingPageStyles} from '../assets/dummystyle'
import { ArrowRight, LayoutTemplate, Menu, X } from 'lucide-react'
import {UserContext} from '../context/UserContext'
import { ProfileInfocard } from '../components/Cards'

const Landing = () => {
  const {user} = useContext(UserContext);
  const navigate =useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage]= useState("login");

  const handleCTA =()=>{
    if(!user){
      setOpenAuthModal(true)
    } else {
      navigate('/dashbord')
    }
  }

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

      {/* MAIN CONTENT*/}
      <main className={landingPageStyles.main} >
        {/* Hero */}
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            {/* LEFT CONTENT */}
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>
                Professional Resume Builder
              </div>
              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>Craft</span>
                <span className={landingPageStyles.headingGradient}>Professional</span>
                <span className={landingPageStyles.headingText}>Resumes.</span>
              </h1>
              <p className={landingPageStyles.description}>
                Create job-winning Resume with expertly designd templates. ATS-friendly & Tailored to your career.
              </p>

              <div className={landingPageStyles.ctaButtons}>
                <button className={ landingPageStyles.primaryButton} onClick={handleCTA}>
                  <div className={landingPageStyles.primaryButtonOverlay}></div>
                  <span className={landingPageStyles.primaryButtonContent}>
                    Start Building
                    <ArrowRight className={landingPageStyles.primaryButtonIcon}/>
                  </span>
                </button>
                <button className={landingPageStyles.secondaryButton} onClick={handleCTA}> View Templates</button>
              </div>
              {/* Stat Grid */}
              <div className={landingPageStyles.statsContainer}>
                {[
                  { value: '50K+', label: 'Resumes Created', gradient: 'from-violet-600 to-fuchsia-600' },
                  { value: '4.9★', label: 'User Rating', gradient: 'from-orange-500 to-red-500' },
                  { value: '5 Min', label: 'Build Time', gradient: 'from-emerald-500 to-teal-500' }
                ].map((stat, idx)=>(
                  <div className={landingPageStyles.statItem} key={idx}>
                    <div className={`${landingPageStyles.statNumber} ${stat.gradient}`}>
                      {stat.value}
                    </div>
                    <div className={landingPageStyles.statLabel}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* /RIGHT CONTENT 2.02*/}
          </div>
        </section>
      </main>

    
    </div>
  )
}

export default Landing

