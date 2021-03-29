import React, {useContext, useState} from 'react'
import history from '../history'
import {AuthContext} from '../context/authContext'
import styles from '../components/css/NewUpdateUser.css'
import axios from 'axios'

const NewUpdateUser = () => {
  // get user from auth context
  const {user, setUser} = useContext(AuthContext)

  // initialize local state for the form
  const [firstName, setFirstName] = useState(user.firstName || '')
  const [lastName, setLastName] = useState(user.lastName || '')
  const [email, setEmail] = useState(user.email || '')
  const [password, setPassword] = useState(user.password || '')

  async function handleSubmit(e) {
    e.preventDefault()

    let updateInfo = {
      firstName,
      lastName,
      email,
      password,
    }

    try {
      // persist new user info to db
      const {data} = await axios.put(`/api/users/${user.id}`, updateInfo)

      // then update local state
      setUser(data)

      // redirect to user profile
      history.push('/profile')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div className={styles.NewUpdateUserContainer}>
        <div className={styles.NewUpdateUserContainerLeft}>
          <h1>Update Profile</h1>
        </div>

        <div className={styles.NewUpdateUserContainerRight}>
          <div>
            <form className={styles.flexCol} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name</label>
                <input
                  className={styles.formControl}
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name </label>
                <input
                  className={styles.formControl}
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                  className={styles.formControl}
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password </label>
                <input
                  className={styles.formControl}
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <input
                className={styles.formControl}
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUpdateUser
