import React, {useState, useEffect, useMemo, useContext} from 'react'
import {AuthContext} from '../context/authContext'

import axios from 'axios'
import isAdmin from './helper/isAdmin'
import AddMemberDropdown from './sub-components/AddMemberDropdown'

import ProjectCard from './ProjectCard'
import UserCard from './UserCard'
import styles from './css/SingleOrganization.module.css'

const SingleOrganization = ({match}) => {
  const {user} = useContext(AuthContext)
  const userId = user.id

  // grab orgId from match
  const organizationId = +match.params.organizationId
  // assign local state
  const [organization, setOrganization] = useState({})
  const [projects, setProjects] = useState([])

  const [status, setStatus] = useState(false)

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

    const fetchStatus = async () => {
      try {
        setStatus(await isAdmin(userId, organizationId))
      } catch (e) {
        console.log(e)
      }
    }

    fetchSingleOrg()
    fetchStatus()

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
      setStatus,
      status,
    }
  }, [organization, projects, status])

  // destructure organization
  const {name, imageUrl, users} = organization

  return (
    <div className="topLevelViewContainer">
      <div className={styles.organizationContainer}>
        <img className={styles.organizationImg} src={imageUrl} />
        <div className={styles.membersAndProjects}>
          <div className={styles.membersContainer}>
            <div className={styles.membersTitle}>Members:</div>
            {status ? <AddMemberDropdown orgId={organizationId} /> : null}

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
