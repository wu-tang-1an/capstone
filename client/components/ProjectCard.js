import React from 'react'
import styles from './css/ProjectCard.css'

const ProjectCard = ({project}) => {
  const {name, description, imageUrl, status} = project
  return (
    <div className={styles.projectCardContainer}>
      <img src={imageUrl} />
      <div>{name}</div>
      <div>{status}</div>
      <div>{description}</div>
    </div>
  )
}

export default ProjectCard
