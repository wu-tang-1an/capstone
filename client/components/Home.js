import React, {useContext} from 'react'
import {AuthContext} from '../context/authContext'
import styles from './css/Home.css'

const Home = () => {
  const {user} = useContext(AuthContext)

  console.log('user is: ', user)

  if (
    user.firstName === 'Add First Name' &&
    user.lastName === 'Add Last Name'
  ) {
    return (
      <div className={styles.homeContainer}>
        <div className={styles.welcome}>
          <span>Welcome!</span>
        </div>
        <div className={styles.myFeed}></div>
        {/* chat component here */}
      </div>
    )
  }
  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcome}>
        <span>Welcome, {user.firstName}!</span>
      </div>
      <div className={styles.myFeed}></div>
      {/* chat component here */}
    </div>
  )
}

export default Home
