import React, {useContext, useEffect} from 'react'
//import styled from 'styled-components'
import {AuthContext} from '../context/authContext'

const NewUpdateUser = () => {
  // get user from auth context
  const {user, setUser} = useContext(AuthContext)

  console.log('user--->', user)

  function handleChange(event) {
    setUser(([event.target.name] = event.target.value))
  }

  function handleSubmit() {
    /////get mapdispatchtoprops
  }

  return (
    <div>
      <h1>Update Profile</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Password:
              <input name="password" type="password" onChange={handleChange} />
            </label>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default NewUpdateUser
