import React from 'react'
import {withRouter} from 'react-router'
import ProjectProvider from '../context/projectContext'
import Board from './Board'

const ProjectView = (props) => {
  const projectId = +props.match.params.projectId

  console.log('projectId is: ', projectId)

  return (
    <ProjectProvider projectId={projectId}>
      <div className="topLevelViewContainer">
        <Board />
      </div>
    </ProjectProvider>
  )
}

export default withRouter(ProjectView)
