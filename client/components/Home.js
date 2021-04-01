import React, {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../context/authContext'
import {fetchUserOrgs} from '../context/axiosService'
import moment from 'moment'
import styles from './css/Home.module.css'

const Home = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // set local state mgmt
  const [organizations, setOrganizations] = useState([])
  const [projects, setProjects] = useState([])
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])

  // fetch all user's orgs
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

  if (
    organizations.length &&
    (!projects.length || !columns.length || !tasks.length)
  ) {
    setProjects(organizations.map((org) => org.projects).flat())
    setColumns(projects.map((project) => project.columns).flat())
    setTasks(columns.map((column) => column.tasks).flat())
  }

  const myFeed = async () => {
    const today = new Date()
    const yesterday = new Date(today)
    const start = new Date(yesterday.setDate(yesterday.getDate() - 1))
    console.dir(yesterday, start)
    const feed = {
      tasks: tasks.map((task) => task.editTimeStamp),
    }
    console.log(feed)
  }
  myFeed()

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
