import React from 'react'
import {withRouter} from 'react-router'
import ProjectProvider from '../context/projectContext'
import Board from './Board'
import DirectoryBar from './DirectoryBar'
import styles from './css/ProjectView.module.css'
import socket, {socketReceived} from '../socket'

const ProjectView = ({match}) => {
  const projectId = +match.params.projectId

  return (
    <div className={styles.projectContainer}>
      <ProjectProvider projectId={projectId}>
        <DirectoryBar />
        <Board />
      </ProjectProvider>
    </div>
  )
}

export default withRouter(ProjectView)
