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

  const getStartDate = (endpoint, numDays) => {
    return new Date(endpoint.setDate(endpoint.getDate() - numDays))
  }

  const myFeed = async () => {
    const today = new Date()

    const startDate = getStartDate(new Date(today), 50)

    const feed = {
      tasks: tasks.filter((task) => {
        const withinWindow = new Date(task.editTimeStamp) < new Date(startDate)
        if (withinWindow) {
          console.log('within window!')
          return task
        }
      }),
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
