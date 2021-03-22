import React, {useEffect, useState} from 'react'
import axios from 'axios'
import styles from './Profile.css'
import {Link} from 'react-router-dom'

export default function Profile() {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    async function fetchApi() {
      try {
        let {data} = await axios.get('/api/users/1')
        setProfile(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchApi()
  }, {})

  console.log('this is the profile ', profile)

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
