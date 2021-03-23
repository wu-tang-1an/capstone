import React from 'react'
import ProjectProvider from './ProjectProvider'
import Board from './Board'

const ProjectView = ({match}) => {
  // get projectId from route props
  const projectId = +match.params.projectId

  return (
    /* topLevelViewContainer should be used for all top-level view components */
    <ProjectProvider projectId={projectId}>
      <div className="topLevelViewContainer">
        <Board />
      </div>
    </ProjectProvider>
  )
}

export default ProjectView
