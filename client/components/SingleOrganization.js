import React, {useState, useEffect, useMemo, useContext} from 'react'
import {AuthContext} from '../context/authContext'

import axios from 'axios'
import isAdmin from './helper/isAdmin'
import AddMemberDropdown from './sub-components/AddMemberDropdown'

import ProjectCard from './ProjectCard'
import UserCard from './UserCard'
import styles from './css/SingleOrganization.module.css'
import AddProjectDropdown from './AddProjectDropdown'

const SingleOrganization = ({match}) => {
  const {user} = useContext(AuthContext)
  const userId = user.id

  // grab orgId from match
  const organizationId = +match.params.organizationId
  // assign local state
  const [organization, setOrganization] = useState({})
  const [projects, setProjects] = useState([])

  const [status, setStatus] = useState(false)
  const [members, setMembers] = useState([])
  useEffect(() => {
    let isMounted = true
    const fetchSingleOrg = async () => {
      try {
        const {data} = await axios.get(`/api/organizations/${organizationId}`)
        setOrganization(data)
        setProjects(data.projects)
        setMembers(data.users)
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
  const {name, imageUrl} = organization

  function removeUser(currentUser) {
    setMembers(members.filter((member) => member.id !== currentUser))
  }

  return (
    <div className="topLevelViewContainer">
      <div className={styles.organizationContainer}>
        <h1>Organization: {organization.name}</h1>
        <img className={styles.organizationImg} src={imageUrl} />
        <div className={styles.membersAndProjects}>
          <div className={styles.membersContainer}>
            <div className={styles.membersTitle}>Members:</div>
            {status ? <AddMemberDropdown orgId={organizationId} /> : null}

            <div className={styles.memberList}>
              {members &&
                members.map((user) => (
                  <UserCard
                    key={user.id}
                    user={{
                      ...user,
                      orgId: organizationId,
                      removeUser: removeUser,
                    }}
                  />
                ))}
            </div>
          </div>
          <div className={styles.projectsContainer}>
            <div className={styles.projectsTitle}>Projects:</div>
            <div className={styles.projectList}>
              <AddProjectDropdown
                organization={organization}
                setProjects={setProjects}
              />
              {projects &&
                projects.map((project) => (
                  <div key={project.id}>
                    <ProjectCard
                      project={project}
                      organization={organization}
                      setProjects={setProjects}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleOrganization
