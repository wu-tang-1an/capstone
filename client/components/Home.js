import React, {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import {fetchUserOrgs} from '../context/axiosService'
import styles from './css/Home.module.css'

const Home = () => {
  const {user} = useContext(AuthContext)

  const [organizations, setOrganizations] = useState([])

  useEffect(() => {
    const getMyOrgs = async () => {
      try {
        const myOrgs = await fetchUserOrgs(user.id)
        setOrganizations(myOrgs)
      } catch (err) {
        console.error(err)
      }
    }
    getMyOrgs()
  }, [])

  console.log('myOrgs, ', organizations)

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
