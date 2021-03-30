import React, {useState, useEffect, useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import axios from 'axios'
import {Link} from 'react-router-dom'
import styles from './css/DirectoryBar.module.css'

const DirectoryBar = () => {
  const [organization, setOrganization] = useState({})

  const {project} = useContext(ProjectContext)

  useEffect(() => {
    let isMounted = true
    const fetchOrg = async () => {
      try {
        const {data} = await axios.get(
          `/api/organizations/${project.organizationId}`
        )
        setOrganization(data)
      } catch (err) {
        console.error(err)
      }
    }
    if (project && project.organizationId) fetchOrg()
    return () => {
      isMounted = false
    }
  }, [project])

  return (
    <div className={styles.directoryBarContainer}>
      <Link to={`/organizations/${organization.id}`}>
        <span>{organization.name}</span>
      </Link>
      <span className={styles.divider}>/</span>
      <Link to={`/projects/${project.id}`}>
        <span>{project.name}</span>
      </Link>
    </div>
  )
}

export default DirectoryBar
