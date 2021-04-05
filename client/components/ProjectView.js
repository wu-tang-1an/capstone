import React from 'react'
import {withRouter} from 'react-router'
import ProjectProvider from '../context/projectContext'
import Board from './Board'
import DirectoryBar from './DirectoryBar'
import GoogleDriveButton from '../../google-drive/GoogleDriveButton'
import styles from './css/ProjectView.module.css'

const ProjectView = ({match}) => {
  const projectId = +match.params.projectId

  return (
    <div className={styles.projectContainer}>
      <ProjectProvider projectId={projectId}>
        <DirectoryBar />
        <GoogleDriveButton />
        <Board />
      </ProjectProvider>
    </div>
  )
}

export default withRouter(ProjectView)
