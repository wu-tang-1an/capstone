import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Slider from './Slider'
import {AuthContext} from '../context/authContext'
import {fetchUserOrgs} from '../context/axiosService'
import styles from './css/Home.module.css'

const ListContainer = ({list, type}) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>My {type}</div>
      <ul>
        {list.map((item) => {
          // generate a link based on list type
          // if org or project, link to org || project / orgId || projectId
          // if task, link to task's project board
          const address =
            type === 'Organizations'
              ? `/organizations/${item.id}`
              : type === 'Projects'
              ? `/projects/${item.id}`
              : `/projects/${item.projectId}`

          return (
            <Link key={item.id} to={address}>
              <li className={styles.listItem}>
                {type === 'Tasks' && (
                  <span style={{textAlign: 'right'}}>
                    {moment(
                      new Date(Date.parse(item.completionDate)),
                      'YYYYMMDD'
                    )
                      .endOf('week')
                      .fromNow()}
                  </span>
                )}
                <div
                  style={
                    item.isActiveBadge ? {color: 'red'} : {color: 'inherit'}
                  }
                >
                  {item.name}
                </div>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

const VideoList = ({videoSrcList}) => {
  return (
    <div className={styles.videoContainer}>
      <Slider>
        {videoSrcList.map((src, idx) => (
          <video key={idx} controls>
            <source src={src} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ))}
      </Slider>
    </div>
  )
}

// sub-component renders section views in home
const OverviewSection = ({title, text, videoSrcList, shouldReverse}) => {
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
      <VideoList videoSrcList={videoSrcList} />
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

  // helper extracts tasks from user projects and sorts by closest completionDate
  const getMyTasks = (projects) => {
    const columns = projects.map((project) => project.columns).flat()

    const colAndProjectIds = columns.map((col) => ({
      colId: col.id,
      projectId: col.projectId,
    }))

    const tasks = columns
      .map((col) => col.tasks)
      .flat()
      .filter((task) => task.createdBy === `${user.firstName} ${user.lastName}`)
      .map((task) => {
        const colAndProjectIdObj = colAndProjectIds.find(
          (obj) => obj.colId === task.columnId
        )
        return {...task, projectId: colAndProjectIdObj.projectId}
      })

    return tasks.sort((a, b) => (a.completionDate < b.completionDate ? -1 : 1))
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
      videoSrcList: ['/assets/add-column.webm'],
    },
    {
      id: 2,
      title: 'Creating lists and tasks',
      text:
        "Keeping track of what's next has never been easier: note-ary's task-list system lets you create, assign, and prioritize your workflow. Our realtime communication support keeps you in sync with your teammates -- whatever changes you make will be reflected in your colleagues' boards instantly.",
      videoSrcList: ['/assets/add-column.webm', '/assets/add-task.webm'],
    },
    {
      id: 3,
      title: 'Editing tasks and lists',
      text:
        "Note-ary's built-in Markdown support lets you write and format task descriptions with ease and clarity. Each task comes equipped with a realtime-chat-enabled comments section -- remote communication is key, and note-ary wants to help keep you in the loop.",
      videoSrcList: ['/assets/edit-task.webm'],
    },
    {
      id: 4,
      title: 'Removing tasks and lists',
      text:
        "Finished a task? One-click deletion moves you closer to your goal. New workflow? Create a new list, migrate your tasks, and tear down the old list. Note-ary allows you to customize your workflow to suit your team's unique vision and style.",
      videoSrcList: [
        '/assets/edit-delete-column.webm',
        '/assets/delete-task.webm',
      ],
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
        {panels.map(({id, title, text, videoSrcList}) => (
          <OverviewSection
            key={id}
            title={title}
            text={text}
            videoSrcList={videoSrcList}
            shouldReverse={id % 2 === 0}
          />
        ))}
      </section>
    </div>
  )
}

export default Home
