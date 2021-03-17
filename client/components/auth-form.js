import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  console.log('props--->', props)
  console.log('name--->', name)
  console.log('displayName--->', displayName)
  console.log('handleSubmit--->', handleSubmit)

  if (name === 'login') {
    return (
      <div>
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
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  } else if (name === 'signup') {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>

          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>

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

          {error && error.response && <div> {error.response.data} </div>}
        </form>

        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

const mapLogin = (state) => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error,
})

const mapSignup = (state) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
})

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
