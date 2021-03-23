import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styles from './css/navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <header className={styles.navbarContainer}>
    <div>
      <h1 className={styles.heading}>BOILERMAKER</h1>
      <nav className={styles.headerNav}>
        {isLoggedIn ? (
          <div className={styles.navItemLogin}>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/updateUser">Update Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className={styles.navItem}>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  </header>
)

/**
 * CONTAINER
 */
const mapState = (state) => ({
  isLoggedIn: !!state.singleUser.id,
})

const mapDispatch = (dispatch) => ({
  handleClick: () => dispatch(logout()),
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
