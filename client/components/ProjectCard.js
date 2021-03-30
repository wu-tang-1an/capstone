import React from 'react'
import {Link} from 'react-router-dom'
import styles from './css/ProjectCard.module.css'

const ProjectCard = ({project}) => {
  const {id, name, description, imageUrl, status} = project
  return (
    <Link key={id} to={`/projects/${id}`}>
      <div className={styles.projectCardContainer}>
        <img src={imageUrl} />
        <div className={styles.projectName}>{name}</div>
        <div className={styles.projectStatus}>{status}</div>
        <div className={styles.projectDescription}>{description}</div>
      </div>
    </Link>
  )
}

export default ProjectCard
