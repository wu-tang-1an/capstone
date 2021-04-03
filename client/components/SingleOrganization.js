import React, {useState, useEffect, useMemo, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'

import axios from 'axios'
import isAdmin from './helper/isAdmin'

import AddMemberDialog from './sub-components/AddMemberDialog'
import Modal from './Modal'

import styles from './css/SingleOrganization.module.css'
import {errorRedirect} from './helper/errorHandle'

const ProjectFrame = ({project}) => {
  const {id, name, imageUrl, description, status} = project
  return (
    <Link to={`/projects/${id}`}>
      <div className={styles.projectCardContainer}>
        <div className={styles.cardContents}>
          <img src={imageUrl} />
          <div className={styles.name}>{name}</div>
          <div className={styles.status}>{status}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </Link>
  )
}

const Member = ({member, removeUser}) => {
  const {name, imageUrl, role} = member
  return (
    <div className={styles.memberContainer}>
      <div className={styles.imgAndInfo}>
        <img className={styles.avatar} src={imageUrl} />
        <div className={styles.nameAndRole}>
          <div className={styles.role}>{role}</div>
          <div className={styles.name}>{name}</div>
        </div>
      </div>
      <button type="button" onClick={removeUser}></button>
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

  // handle modal visibility
  const [isModalVisible, setModalVisible] = useState(false)

  // destructure organization
  const {name, imageUrl} = organization

  function removeUser(currentUser) {
    setMembers(members.filter((member) => member.id !== currentUser))
  }

  return (
    <div className={styles.wrapper}>
      {isModalVisible && (
        <Modal>
          <AddMemberModal closeModal={() => setModalVisible(false)} />
        </Modal>
      )}
      <section className={styles.leftPanel}>
        {members.map((member) => (
          <Member key={member.id} member={member} removeUser={removeUser} />
        ))}
        <AddMemberDialog members={members} setMembers={setMembers} />
      </section>
      <section className={styles.rightPanel}>
        <div className={styles.avatarAndName}>
          <img className={styles.organizationImg} src={imageUrl} />
          <div className={styles.sectionHeader}>Organization: {name}</div>
        </div>
        <div className={styles.subsectionHeader}>Projects</div>
        <div className={styles.allProjectsContainer}>
          {projects.map((project) => (
            <ProjectFrame key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default SingleOrganization
