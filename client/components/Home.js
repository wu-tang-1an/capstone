import React, {useContext} from 'react'
import {AuthContext} from '../context/authContext'
import styles from './css/Home.module.css'

const Home = () => {
  const {user} = useContext(AuthContext)

  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcome}>
        <span>Welcome, {user.firstName}!</span>
      </div>
      <div className={styles.myFeed}></div>
    </div>
  )
}

export default Home
