import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import {updateUserDB} from '../context/axiosService'
import {notify} from './helper/toast'
import strConstraints from './helper/strConstrain'
import styles from './css/Profile.module.css'

// eslint-disable-next-line complexity
const validate = (firstName, lastName, imageUrl, email, password) => {
  let errors = []

  if (!firstName.length) errors.push('First name must not be empty!')
  if (firstName > strConstraints.nameMaxChar)
    errors.push(
      `First name is limited to ${strConstraints.nameMaxChar} characters!`
    )

  if (!lastName.length) errors.push('Last name must not be empty!')
  if (lastName > strConstraints.nameMaxChar)
    errors.push(
      `Last name is limited to ${strConstraints.nameMaxChar} characters!`
    )

  if (!imageUrl.length) errors.push('URL must not be empty!')
  // implement check if valid url later

  if (email.length < 5) errors.push('Email must be at least 5 characters long!')
  if (email.length > strConstraints.emailMaxChar)
    errors.push(
      `Email is limited to ${strConstraints.emailMaxChar} characters!`
    )
  if (!email.includes('@')) errors.push('Email must contain an @ symbol!')
  if (!email.includes('.')) errors.push('Email must contain at least one dot!')

  if (!password.length) errors.push('Password must not be empty!')

  return errors
}

const Profile = () => {
  // grab user from auth context
  const {user, setUser} = useContext(AuthContext)

  // initialize local state for form
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [imageUrl, setImageUrl] = useState(user.imageUrl)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password || '')

  // update form logic
  const updateUserInfo = async (e) => {
    e.preventDefault()

    const errors = validate(firstName, lastName, imageUrl, email, password)

    if (errors.length) {
      return errors.forEach((error) => {
        notify(error, 'error')
      })
    }

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
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Last Name </label>
                  <input
                    className={styles.formControl}
                    type="text"
                    name="lastName"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email </label>
                  <input
                    className={styles.formControl}
                    type="text"
                    name="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Password </label>
                  <input
                    className={styles.formControl}
                    name="password"
                    type="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <pre className={styles.imagePreview}>
                    <img src={imageUrl} />
                  </pre>
                  <label className={styles.formLabel}>Photo </label>
                  <input
                    className={styles.formControl}
                    name="photo"
                    type="text"
                    defaultValue={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
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
    </div>
  )
}

export default Profile
