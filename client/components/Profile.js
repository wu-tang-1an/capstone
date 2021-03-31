import React, {useState, useContext} from 'react'
import ProfileCard from './sub-components/ProfileCard'
import ProfileComments from './sub-components/ProfileComments'

import styles from './css/MainProfileComp.module.css'

import {AuthContext} from '../context/authContext'

export default function Profile() {
  // initialize profile state
  const [profile, setProfile] = useState({})

  // grab user from auth context
  const {user} = useContext(AuthContext)

  // if check prevents infinite rerender
  if (!profile.id) setProfile(user)

  return (
    <div className={styles.profileCont}>
      <ProfileCard />
      <ProfileComments />
    </div>
  )
}
