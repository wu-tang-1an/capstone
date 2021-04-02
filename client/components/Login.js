import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import axios from 'axios'
import history from '../history'
import styles from './css/Login.module.css'

const Login = () => {
  // local state of user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // setUser method from AuthProvider
  const {setUser} = useContext(AuthContext)

  // login method
  const authenticateUser = async (e) => {
    e.preventDefault()

    // catch errors with user retrieval
    let res
    try {
      res = await axios.post(`/auth/login`, {
        email,
        password,
      })
    } catch (err) {
      console.log(err)
      setLoginError(err)
    }

    // pull user out of response and set, redirection to all orgs view
    const user = res.data
    try {
      setUser(user)
      history.push('/organizations')
    } catch (err) {
      console.log(err)
      setLoginError(err)
    }
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.authFormContainer}>
        <form onSubmit={authenticateUser}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Log in</button>
          </div>
          {loginError && loginError.response && (
            <div className={styles.warning}> {loginError.response.data} </div>
          )}
        </form>
        <a href="/auth/google">
          <img src="/google-logo.webp" />
          <span>Log in with Google</span>
        </a>
      </div>
    </div>
  )
}

export default Login
