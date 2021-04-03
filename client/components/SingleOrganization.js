import React, {useState, useEffect, useMemo, useContext} from 'react'
import styled from 'styled-components'
import {AuthContext} from '../context/authContext'

import axios from 'axios'
import isAdmin from './helper/isAdmin'
import AddMemberDropdown from './sub-components/AddMemberDropdown'

import ProjectCard from './ProjectCard'
import UserCard from './UserCard'
import styles from './css/SingleOrganization.module.css'
import AddProjectDropdown from './AddProjectDropdown'
import {errorRedirect} from './helper/errorHandle'

const OverflowWrapper = styled.div`
  height: 400px;
  overflow: auto;
`

const ProjectFrame = () => {
  return (
    <div className={styles.projectCardContainer}>
      <Link to={`/projects/${projectId}`}>
        <div className={styles.cardContents}>
          <img src={imageUrl} />
          <div className={styles.orgName}>{name}</div>
          <div className={styles.numMembers}>{`${numMembers} members`}</div>
        </div>
      </Link>
      <button
        className={styles.openModalBtn}
        type="button"
        onClick={() => {
          setOrgIdForDelete(orgId)
          setModalVisible(true)
        }}
      >
        Leave Organization
      </button>
    </div>
  )
}

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
    let org = {}
    let admin = false

    const fetchSingleOrg = async () => {
      try {
        org = await axios.get(`/api/organizations/${organizationId}`)
      } catch (err) {
        console.error(err)
        errorRedirect('/organizations')
      }
    }

    const fetchStatus = async () => {
      try {
        admin = await isAdmin(userId, organizationId)
      } catch (e) {
        console.log(e)
      }
    }

    fetchSingleOrg().then(() => {
      if (isMounted) {
        setOrganization(org.data)
        setProjects(org.data.projects)
        setMembers(org.data.users)
      }
    })

    fetchStatus().then(() => {
      if (isMounted) setStatus(admin)
    })

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
    <div className={styles.organizationContainer}>
      <div className={styles.header}>Organization: {organization.name}</div>
      <img className={styles.organizationImg} src={imageUrl} />
      <div className={styles.membersAndProjects}>
        <div className={styles.membersContainer}>
          <div className={styles.membersTitle}>Members:</div>
          <OverflowWrapper>
            {status ? <AddMemberDropdown orgId={organizationId} /> : null}

            <div className={styles.memberList}>
              {members &&
                members.map((member) => (
                  <UserCard
                    key={member.id}
                    user={{
                      ...member,
                      orgId: organizationId,
                      removeUser: removeUser,
                      mainUser: user,
                    }}
                  />
                ))}
            </div>
          </OverflowWrapper>
        </div>

        <div className={styles.projectsContainer}>
          <div className={styles.projectsTitle}>Projects:</div>
          <div className={styles.projectList}>
            <OverflowWrapper>
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
            </OverflowWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleOrganization
