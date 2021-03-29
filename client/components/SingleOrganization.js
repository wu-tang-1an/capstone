import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ProjectCard from './ProjectCard'
import UserCard from './UserCard'
import styles from './css/SingleOrganization.css'

const SingleOrganization = ({match}) => {
  // grab orgId from match
  const organizationId = +match.params.organizationId

  // assign local state
  const [organization, setOrganization] = useState({})
  const [projects, setProjects] = useState([])

  console.log('organization--->', organization)
  console.log('projects--->', projects)

  // get single org with direct api call
  // no context/provider here since it's a direct route
  useEffect(() => {
    let isMounted = true
    const fetchSingleOrg = async () => {
      try {
        const {data} = await axios.get(`/api/organizations/${organizationId}`)
        setOrganization(data)
        setProjects(data.projects)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSingleOrg()

    return () => {
      isMounted = false
    }
  }, [])

  // memoize to keep rerenders to a minimum
  useMemo(() => {
    return {
      organization,
      setOrganization,
      projects,
      setProjects,
    }
  }, [organization, projects])

  // destructure organization
  const {name, imageUrl, users} = organization

  return (
    <div className="topLevelViewContainer">
      <div className={styles.organizationContainer}>
        <img className={styles.organizationImg} src={imageUrl} />
        <div className={styles.membersAndProjects}>
          <div className={styles.membersContainer}>
            <div className={styles.membersTitle}>Members:</div>
            <div className={styles.memberList}>
              {users &&
                users.map((user) => <UserCard key={user.id} user={user} />)}
            </div>
          </div>
          <div className={styles.projectsContainer}>
            <div className={styles.projectsTitle}>Projects:</div>
            <div className={styles.projectList}>
              {projects &&
                projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleOrganization
