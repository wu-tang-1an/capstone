import React, {useEffect, useState} from 'react'
import ProfileCard from './sub-components/ProfileCard'
import ProfileComments from './sub-components/ProfileComments'
import styles from './css/MainProfileComp.css'

export default function Profile() {
  return (
    <div className={styles.profileCont}>
      <ProfileCard />
      <ProfileComments />
    </div>
  )
}
