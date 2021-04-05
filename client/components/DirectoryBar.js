import React, {useState, useEffect, useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import {Link} from 'react-router-dom'
import styles from './css/DirectoryBar.module.css'
import {getOrgDb} from '../context/axiosService'
import {errorRedirect} from './helper/errorHandle'

const DirectoryBar = () => {
  const [organization, setOrganization] = useState({})

  const {project} = useContext(ProjectContext)

  useEffect(() => {
    let isMounted = true
    let org = {}

    const fetchOrg = async () => {
      try {
        org = await getOrgDb(project.organizationId)

        if (!org) errorRedirect('/organizations')
      } catch (err) {
        console.error(err)
        errorRedirect('/organizations')
      }
    }

    if (project && project.organizationId)
      fetchOrg().then(() => {
        if (isMounted) setOrganization(org)
      })

    return () => {
      isMounted = false
    }
  }, [project])

  return (
    <div className={styles.directoryBarContainer}>
      <div>
        <strong>Organization: </strong>
        <Link to={`/organizations/${organization.id}`}>
          <span> {organization.name}</span>
        </Link>
      </div>
      <span className={styles.divider}> / </span>
      <div>
        <strong>Project: </strong>

        <Link to={`/projects/${project.id}`}>
          <span> {project.name}</span>
        </Link>
      </div>
    </div>
  )
}

export default DirectoryBar
