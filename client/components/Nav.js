import React, {useContext} from 'react'
import {AuthContext} from '../context/authContext'
import {Link} from 'react-router-dom'
import axios from 'axios'
import history from '../history'
import styles from './css/Nav.module.css'

const NavLink = ({name, linkPath, iconText}) => {
  return (
    <Link to={linkPath} className={styles.navLinkContainer}>
      <span className="material-icons">{iconText}</span>
      <span className={styles.navLinkName}>{name}</span>
    </Link>
  )
}

const Nav = () => {
  const {user, setUser} = useContext(AuthContext)

  const loggedInLinks = [
    // home will be a splash page with
    // links to create a project / org, templates
    // news feed, chat feed, etc.
    {
      id: 1,
      name: 'Home',
      linkPath: '/home',
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

  const loggedOutLinks = [
    {
      id: 4,
      name: 'Login',
      linkPath: '/login',
      iconText: 'login',
    },
    {
      id: 5,
      name: 'Signup',
      linkPath: '/signup',
      iconText: 'person_add',
    },
  ]

  const logout = async () => {
    try {
      await axios.post('/auth/logout')
      setUser({})
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <nav>
      <div className={styles.logo}>
        <span className="material-icons">note_alt</span>
        <span>note-ary</span>
      </div>
      <div className={styles.navLinks}>
        {!user.id &&
          loggedOutLinks.map((link) => <NavLink key={link.id} {...link} />)}
        {user.id &&
          loggedInLinks.map((link) => <NavLink key={link.id} {...link} />)}
        {user.id && (
          <a href="#" className={styles.navLinkContainer} onClick={logout}>
            <span className="material-icons">logout</span>
            <span className={styles.navLinkName}>Logout</span>
          </a>
        )}
      </div>
    </nav>
  )
}

export default Nav
