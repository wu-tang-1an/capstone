import React, {useState, useEffect, useMemo, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import {auth} from '../store'
import axios from 'axios'
import history from '../history'
import styles from './css/AuthForm.css'

const AuthForm = ({authType}) => {
  // local state of user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // local state of login/signup method
  // either 'me' or 'google'
  const [method, setMethod] = useState('')

  // setUser method from AuthProvider
  const {user, setUser} = useContext(AuthContext)

  console.log('user before login, ', user)

  // local form field data depends on method
  const {name, displayName, error} =
    authType === 'login'
      ? {
          name: 'login',
          displayName: 'Login',
          /* error: state.singleUser.error, */
        }
      : {
          name: 'signup',
          displayName: 'Sign Up',
          /* error: state.singleUser.error, */
        }

  const authenticateUser = async (e, formName, userEmail, userPassword) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`/auth/${formName}`, {
        email: userEmail,
        password: userPassword,
      })
      setUser(data)
      history.push('/organizations')
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    console.log(e.target)

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
          <img src="google-logo.webp" />
          <span>{displayName} with Google</span>
        </a>
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

export default AuthForm
