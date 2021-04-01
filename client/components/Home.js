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

  // helper returns a startDate to establish a window for user feed
  const getStartDate = (endpoint, numDays) => {
    return new Date(endpoint.setDate(endpoint.getDate() - numDays))
  }

  // get a line-item for user feed
  // output: "deploy on heroku was edited on Wed Jul 29 2020"
  const getSnapshot = (task) => {
    return `${task.name} was edited on ${new Date(
      task.editTimeStamp
    ).toDateString()}`
  }

  // generate a list of tasks that are marked urgent / active
  const importantTasks = () => {
    return tasks.filter((task) => task.isActiveBadge)
  }

  // generate a list of user feed line-items
  const myFeed = () => {
    // get today
    const today = new Date()

    // set the boundary date before today with getStartDate()
    const startDate = getStartDate(new Date(today), 200)

    // filter project tasks by window
    const recentTasks = tasks.filter((task) => {
      const withinWindow = new Date(task.editTimeStamp) < new Date(startDate)

      if (withinWindow) return task
    })

    // return a list of line-items
    return recentTasks.map((task) => getSnapshot(task))
  }

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
