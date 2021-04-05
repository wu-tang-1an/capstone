import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import axios from 'axios'
import history from '../history'
import {notify} from './helper/toast'
import styles from './css/Signup.module.css'
import {notify} from './helper/toast'

const validate = (firstName, lastName, email, password) => {
  let errors = []

  if (!firstName.length) errors.push('First name must not be empty!')
  if (!lastName.length) errors.push('Last name must not be empty!')

  if (email.length < 5) errors.push('Email must be at least 5 characters long!')
  if (!email.includes('@')) errors.push('Email must contain an @ symbol!')
  if (!email.includes('.')) errors.push('Email must contain at least one dot!')

  if (!password.length) {
    errors.push('Password must not be empty!')
  }

  return errors
}

const Signup = () => {
  // retrieve the user's email from landing page
  const newUserEmail = localStorage.getItem('newUserEmail')

  // form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(newUserEmail || '')
  const [password, setPassword] = useState('')

  // setUser method from AuthProvider
  const {setUser} = useContext(AuthContext)

  // login method
  const authenticateUser = async (e) => {
    e.preventDefault()

    const errors = validate(firstName, lastName, email, password)

    if (errors.length) {
      errors.forEach((error) => {
        notify(error, 'error')
      })

      return
    }

    // catch errors with user retrieval
    let res
    try {
      res = await axios.post(`/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      })
    } catch (err) {
      notify(`${err}`, 'error')
    }

    // pull user out of response, add local set on AuthContext
    // then redirect to all orgs view
    const user = res.data
    try {
      setUser(user)
      history.push('/home')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.sectionHeader}>
        Signup with <span className={styles.notearyColor}>note&#8209;ary</span>
      </div>

      <section className={styles.formAndBtns}>
        <form className={styles.signupForm}>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>

        <div className={styles.btnContainer}>
          <button
            type="submit"
            className={styles.signMeUpBtn}
            onClick={authenticateUser}
          >
            Sign me up!
          </button>
          <a href="/auth/google" className={styles.googleSignupBtn}>
            <span>
              <img src="/google-logo.webp" />
            </span>
            Signup with Google
          </a>
        </div>
      </section>
    </div>
  )
}

export default Signup
