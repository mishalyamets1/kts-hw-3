import React, { useState } from 'react'
import styles from 'components/Header/Header.module.scss'
import Text from '../ui-kit/Text'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
           <img src="/svg/Frame 4.svg" alt="logo" /> 
        </div>
        <nav className={styles.nav}>
            <NavLink to='/' className={({isActive})=> clsx(styles.link, {[styles.active]: isActive})}>
              <Text color='primary' view='p-18' tag='p'>Products</Text>
            </NavLink>
            <NavLink to='/categories' className={({isActive})=> clsx(styles.link, {[styles.active]: isActive})}>
              <Text color='primary' view='p-18' tag='p'>Categories</Text>
            </NavLink>
            <NavLink to='/about' className={({isActive})=> clsx(styles.link, {[styles.active]: isActive})}>
              <Text color='primary' view='p-18' tag='p'>About us</Text>
            </NavLink>
        </nav>
        <div className={styles.icons}>
            <div className={styles.cart}> <img src="/svg/bag-2.svg" alt=""/></div>
            <div className={styles.account}><img src="/svg/user.svg" alt=""/></div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className={styles.burger}>
        <div className={styles.logo}>
           <img src="/svg/Frame 4.svg" alt="logo" /> 
        </div>
        
        <div className={styles.icons}>
          <button 
          className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
            <div className={styles.cart}> <img src="/svg/bag-2.svg" alt=""/></div>
            <div className={styles.account}><img src="/svg/user.svg" alt=""/></div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className={styles.navMobile}>
          <NavLink to='/' className={({isActive})=> `${styles.link} ${isActive ? styles.active : ''}`} onClick={closeMenu}>
            <Text color='primary' view='p-18' tag='p'>Products</Text>
          </NavLink>
          <NavLink to='/categories' className={({isActive})=> `${styles.link} ${isActive?styles.active:''}`} onClick={closeMenu}>
            <Text color='primary' view='p-18' tag='p'>Categories</Text>
          </NavLink>
          <NavLink to='/about' className={({isActive})=> `${styles.link} ${isActive?styles.active:''}`} onClick={closeMenu}>
            <Text color='primary' view='p-18' tag='p'>About us</Text>
          </NavLink>
        </nav>
      )}
    </>
  )
}

export default Header