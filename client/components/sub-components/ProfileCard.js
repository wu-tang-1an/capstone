import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import styles from '../css/Profile.css'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/authContext'

export default function ProfileCard() {
  const [profile, setProfile] = useState({})
  const {user} = useContext(AuthContext)

  useEffect(() => {
    let isMounted = true
    async function fetchApi() {
      try {
        let {data} = await axios.get(`/api/users/${user.id}`)
        setProfile(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchApi()
    return () => {
      isMounted = false
    }
  }, {})

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
