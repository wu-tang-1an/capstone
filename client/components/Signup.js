import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import axios from 'axios'
import history from '../history'
import styles from './css/Signup.module.css'

const Signup = () => {
  // retrieve the user's email from landing page
  const newUserEmail = localStorage.getItem('newUserEmail')

  // form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(newUserEmail || '')
  const [password, setPassword] = useState('')

  // reveal form
  const [isFormVisible, setFormVisible] = useState(false)

  // setUser method from AuthProvider
  const {setUser} = useContext(AuthContext)

  // login method
  const authenticateUser = async (e) => {
    e.preventDefault()

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
      console.error(err)
    }

    // pull user out of response, add local set on AuthContext
    // then redirect to all orgs view
    const user = res.data
    try {
      setUser(user)
      history.push('/organizations')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section>
      <div className={styles.leftPanel}>
        <div className={styles.title}>
          Signup with{' '}
          <span className={styles.notearyColor}>note&#8209;ary</span>
        </div>
        <div className={styles.signupContainer}>
          {!isFormVisible && (
            <div className={styles.btnContainer}>
              <a href="/auth/google" className={styles.googleSignupBtn}>
                <span>
                  <img src="/google-logo.webp" />
                </span>
                Signup with Google
              </a>
              <button
                type="submit"
                className={styles.localSignupBtn}
                onClick={() => setFormVisible(!isFormVisible)}
              >
                Signup Direct
              </button>
            </div>
          )}
          {isFormVisible && (
            <form>
              <span onClick={() => setFormVisible(!isFormVisible)}>
                Back to signup options
              </span>
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
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={styles.signMeUp}
                onClick={authenticateUser}
              >
                Sign me up!
              </button>
            </form>
          )}
        </div>
      </div>
      <div className={styles.photo}>
        <div className={styles.transparencyMask}></div>
      </div>
    </section>
  )
}

export default Signup
