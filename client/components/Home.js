import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/authContext'
import {fetchUserOrgs} from '../context/axiosService'
import styles from './css/Home.module.css'

const Home = () => {
  const {user} = useContext(AuthContext)

  const [userOrgs, setUserOrgs] = useState([])

  useEffect(() => {
    const getUserOrgs = async () => {
      try {
        const organizations = await fetchUserOrgs(user.id)
        setUserOrgs(organizations)
      } catch (err) {
        console.error(err)
      }
    }
    getUserOrgs()
  }, [])

  console.log(userOrgs)

  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcome} style={{padding: '10px'}}>
        <span>Welcome, {user.firstName}!</span>
      </div>
      <div className={styles.myFeed}></div>
    </div>
  )
}

export default Home
