import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

import styles from './AuthForm.css'
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className={styles.outerContainer}>
      <div className={styles.authFormContainer}>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
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

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.singleUser.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.singleUser.error,
  }
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

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
