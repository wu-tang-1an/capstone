import React from 'react'
import {Link} from 'react-router-dom'
import ProjectCardDropDown from './ProjectCardDropDown'
import styles from './css/ProjectCard.css'

const ProjectCard = ({project, organization, setProjects}) => {
  const {id, name, description, imageUrl, status} = project
  return (
    <div>
      <ProjectCardDropDown
        project={project}
        organization={organization}
        setProjects={setProjects}
      />
      <Link key={id} to={`/projects/${id}`}>
        <div className={styles.projectCardContainer}>
          <img src={imageUrl} />
          <div className={styles.projectName}>{name}</div>
          <div className={styles.projectStatus}>{status}</div>
          <div className={styles.projectDescription}>{description}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProjectCard
