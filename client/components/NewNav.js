import React, {useContext} from 'react'
import {AuthContext} from '../context/authContext'
import {Link} from 'react-router-dom'
import axios from 'axios'
import history from '../history'
import styles from './css/NewNav.css'

const NavLink = ({name, linkPath, iconText}) => {
  return (
    <Link to={linkPath} className={styles.navLinkContainer}>
      <span className="material-icons">{iconText}</span>
      <span className={styles.navLinkName}>{name}</span>
    </Link>
  )
}

const Nav = () => {
  const {setUser} = useContext(AuthContext)

  const links = [
    // home will be a splash page with
    // links to create a project / org, templates
    // news feed, chat feed, etc.
    {
      id: 1,
      name: 'Home',
      linkPath: '/',
      iconText: 'home',
    },
    {
      id: 2,
      name: 'Organizations',
      linkPath: '/organizations',
      iconText: 'corporate_fare',
    },
    {
      id: 3,
      name: 'Profile',
      linkPath: '/profile',
      iconText: 'person_outline',
    },
  ]

  const logout = async () => {
    try {
      await axios.post('/auth/logout')
      setUser({})
      history.push('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <nav>
      <img src="/note-ary.png" className={styles.logo} />
      <div className={styles.navLinks}>
        {links.map((link) => (
          <NavLink key={link.id} {...link} />
        ))}
        <a href="#" className={styles.navLinkContainer} onClick={logout}>
          <span className="material-icons">logout</span>
          <span className={styles.navLinkName}>Logout</span>
        </a>
      </div>
    </nav>
  )
}

export default Nav
