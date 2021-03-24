import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import axios from 'axios'
import history from '../history'
import styles from './css/AuthForm.css'

const AuthForm = ({authType}) => {
  // local state of user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // local state of login/signup method
  // either 'me' or 'google'
  const [authMethod, setAuthMethod] = useState('login')

  // setUser method from AuthProvider
  const {setUser} = useContext(AuthContext)

  // local form field data depends on method
  const {name, displayName, error} =
    authType === 'signup'
      ? {
          name: 'signup',
          displayName: 'Sign Up',
          /* error: state.singleUser.error, */
        }
      : {
          name: 'login',
          displayName: 'Log In',
          /* error: state.singleUser.error, */
        }

  // login method
  const authenticateUser = async (e, formName, userEmail, userPassword) => {
    e.preventDefault()

    // first, auth/login to establish req.user
    // second, auth/me or auth/google to fetch user with associations
    try {
      await axios.post(`/auth/${formName}`, {
        email: userEmail,
        password: userPassword,
      })
      const {data} = await axios.get('/auth/me')
      setUser(data || {})
      history.push('/organizations')
    } catch (err) {
      console.error(err)
    }
  }

  // form management method
  const handleChange = (e) => {
    e.target.name === 'email'
      ? setEmail(e.target.value)
      : setPassword(e.target.value)
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.authFormContainer}>
        <form
          onSubmit={(e) => authenticateUser(e, name, email, password)}
          name={name}
        >
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" onChange={handleChange} />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && (
            <div className={styles.warning}> {error.response.data} </div>
          )}
        </form>
        <a href="/auth/google">
          <img src="/google-logo.webp" />
          <span>{displayName} with Google</span>
        </a>
      </div>
    </div>
  )
}

export default AuthForm
