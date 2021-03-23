import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'

const Nav = ({handleClick}) => {
  const user = useContext(AuthContext)

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
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
              <Link className="nav-link" to="/organizations">
                Organizations
              </Link>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <Link className="nav-link" to="#" onClick={handleClick}>
                Logout
              </Link>
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
