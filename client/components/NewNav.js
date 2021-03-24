import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import history from '../history'
import {AuthContext} from '../context/authContext'
import {AiFillHome} from 'react-icons/ai'
import {CgOrganisation, CgProfile, CgLogOut} from 'react-icons/cg'
import styles from './css/NewNav.css'

const Nav = () => {
  const {user, setUser} = useContext(AuthContext)

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      {user.id ? (
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h1 style={{fontFamily: "'Noto Sans KR', sans-serif"}}>Note-ary</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <div className={styles.linkCont}>
                <span className={styles.spanCont}>
                  <AiFillHome />
                </span>

                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </div>

              <div className={styles.linkCont}>
                <span className={styles.spanCont}>
                  <CgOrganisation />
                </span>
                <Link className="nav-link" to="/organizations">
                  Organizations
                </Link>
              </div>

              <div className={styles.linkCont}>
                <span className={styles.spanCont}>
                  <CgProfile />
                </span>

                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </div>

              <div className={styles.linkCont}>
                <span className={styles.spanCont}>
                  <CgLogOut />
                </span>
                <Link className="nav-link" to="#" onClick={logout}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h1 style={{fontFamily: "'Noto Sans KR', sans-serif"}}>Note-ary</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
