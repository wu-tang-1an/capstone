import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/authContext'
import {fetchUserOrgs} from '../context/axiosService'
import styles from './css/Home.module.css'

const ListContainer = ({list, type}) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>My {type}</div>
      <ul>
        {list.map((item) => (
          <li key={item.id} className={styles.listItem}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// sub-component renders section views in home
const OverviewSection = ({title, text, videoSrc, shouldReverse}) => {
  return (
    <div
      className={styles.overviewContainer}
      style={
        shouldReverse ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}
      }
    >
      <div className={styles.titleAndText}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.vid}>
        <video src={videoSrc} />
      </div>
    </div>
  )
}

const Home = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize local state to manage user orgs
  const [userOrgs, setUserOrgs] = useState([])

  // fetch user orgs and place on local state
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

  // helper extracts projects from user orgs
  const getMyProjects = (orgs) => {
    return orgs.map((org) => org.projects).flat()
  }

  // helper extracts tasks from user projects
  const getMyTasks = (projects) => {
    return projects
      .map((project) => project.columns.map((column) => column.tasks).flat())
      .flat()
      .filter((task) => task.createdBy === `${user.firstName} ${user.lastName}`)
  }

  const userProjects = getMyProjects(userOrgs)
  const userTasks = getMyTasks(userProjects)

  // panels are section overviews
  // each is structured: title/text, video
  // alternating left-right layout with flex-wrap reverse
  const panels = [
    {
      id: 1,
      title: 'Working with your project board',
      text:
        "The note-ary board is the heart of your project. Make lists, create tasks, leave comments to encourage your team or suggest changes -- note-ary keeps it flexible and let's you decide what works for you.",
      videoSrc: '',
    },
    {
      id: 2,
      title: 'Creating lists and tasks',
      text:
        "Keeping track of what's next has never been easier: note-ary's task-list system lets you create, assign, and prioritize your workflow. Our realtime communication support keeps you in sync with your teammates -- whatever changes you make will be reflected in your colleagues' boards instantly.",
      videoSrc: '',
    },
    {
      id: 3,
      title: 'Editing tasks and lists',
      text:
        "Note-ary's built-in Markdown support lets you write and format task descriptions with ease and clarity. Each task comes equipped with a realtime-chat-enabled comments section -- remote communication is key, and note-ary wants to help keep you in the loop.",
      videoSrc: '',
    },
    {
      id: 4,
      title: 'Removing tasks and lists',
      text:
        "Finished a task? One-click deletion moves you closer to your goal. New workflow? Create a new list, migrate your tasks, and tear down the old list. Note-ary allows you to customize your workflow to suit your team's unique vision and style.",
      videoSrc: '',
    },
  ]

  const lists = [
    {
      id: 1,
      list: userOrgs,
      type: 'Organizations',
    },
    {
      id: 2,
      list: userProjects,
      type: 'Projects',
    },
    {
      id: 3,
      list: userTasks,
      type: 'Tasks',
    },
  ]

  return (
    <div className={styles.homeContainer}>
      <section className={styles.myFeed}>
        <div className={styles.sectionHeader}>My Feed</div>
        {lists.map(({id, list, type}) => (
          <ListContainer key={id} list={list} type={type} />
        ))}
      </section>
      <section className={styles.overview}>
        <div className={styles.sectionHeader}>Welcome and Overview</div>
        {panels.map(({id, title, text, videoSrc}) => (
          <OverviewSection
            key={id}
            title={title}
            text={text}
            videoSrc={videoSrc}
            shouldReverse={id % 2 === 0}
          />
        ))}
      </section>
    </div>
  )
}

export default Home
