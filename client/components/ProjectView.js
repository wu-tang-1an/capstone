import React from 'react'
import {withRouter} from 'react-router'
import ProjectProvider from '../context/projectContext'
import Board from './Board'

const ProjectView = ({match}) => {
  console.log('routeProps:match are: ', match)

  const projectId = +match.params.projectId

  return (
    <div className="topLevelViewContainer">
      <ProjectProvider projectId={projectId}>
        <Board />
      </ProjectProvider>
    </div>
  )
}

export default withRouter(ProjectView)
