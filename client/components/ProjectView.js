import React from 'react'
import {withRouter} from 'react-router'
import ProjectProvider from '../context/projectContext'
import Board from './Board'
import DirectoryBar from './DirectoryBar'
import styles from './css/ProjectView.module.css'

const ProjectView = ({match}) => {
  const projectId = +match.params.projectId

  return (
    <div className={styles.projectContainer} style={{marginTop: '15px'}}>
      <ProjectProvider projectId={projectId}>
        <DirectoryBar />
        <Board />
      </ProjectProvider>
    </div>
  )
}

export default withRouter(ProjectView)
