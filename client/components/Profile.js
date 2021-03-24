import React, {useState, useContext} from 'react'
import styles from './css/Profile.css'
import {Link} from 'react-router-dom'

import {AuthContext} from '../context/authContext'

export default function Profile() {
  // initialize profile state
  const [profile, setProfile] = useState({})

  // grab user from auth context
  const {user} = useContext(AuthContext)

  // if check prevents infinite rerender
  if (!profile.id) setProfile(user)

  return (
    <div className={styles.profileMasterCont}>
      <div className={styles.profileContainer}>
        <div className={styles.profileImgCont}>
          <img className={styles.profileImg} src={profile.imageUrl} />
        </div>
        <div className={styles.nameCont}>
          <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
        </div>
        <div className={styles.emailCont}>
          <h3>{profile.email}</h3>
        </div>

        <div className={styles.updateProfileCont}>
          <Link to="/updateProfile">Update Profile</Link>
        </div>
      </div>
    </div>
  )
}
