import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import {fetchUserDB, updateUserDB} from '../context/axiosService'
import styles from './css/MainProfileComp.module.css'

const Profile = () => {
  // grab user from auth context
  const {user, setUser} = useContext(AuthContext)

  // initialize local state for form
  const [firstName, setFirstName] = useState(user.firstName || '')
  const [lastName, setLastName] = useState(user.lastName || '')
  const [imageUrl, setImageUrl] = useState(user.imageUrl || '')
  const [email, setEmail] = useState(user.email || '')
  const [password, setPassword] = useState(user.password || '')

  // update form logic
  const updateUserInfo = async (e) => {
    e.preventDefault()

    const updateInfo = {
      ...user,
      firstName,
      lastName,
      imageUrl,
      email,
      password,
    }

    try {
      const updatedUser = await updateUserDB(user.id, updateInfo)
      setUser(updatedUser)
    } catch (err) {
      console.error(err)
    }
  }

  // form subcomponent has access to setters
  // if we place it inside profile component
  const Form = () => {
    return (
      <div className={styles.formContainer}>
        <div className={styles.NewUpdateUserContainer}>
          <h1>Update Profile</h1>
          <div className={styles.NewUpdateUserContainerRight}>
            <div>
              <form className={styles.flexCol} onSubmit={updateUserInfo}>
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
                  <label className={styles.formLabel}>Email </label>
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
                  value="Update My Info"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MyInfo = () => {
    return (
      <div className={styles.profileMasterCont}>
        <div className={styles.profileContainer}>
          <div className={styles.profileImgCont}>
            <img className={styles.profileImg} src={user.imageUrl} />
          </div>
          <div className={styles.nameCont}>
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
          </div>
          <div className={styles.emailCont}>
            <h3>{user.email}</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.profileCont}>
      <MyInfo />
      <Form />
    </div>
  )
}

export default Profile
