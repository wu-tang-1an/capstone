import React from 'react'
import {Link} from 'react-router-dom'
import styles from './css/DirectoryBar.css'

const DirectoryBar = ({project, organization}) => {
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
