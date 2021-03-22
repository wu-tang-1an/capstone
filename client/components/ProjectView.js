import React from 'react'
import Board from './Board'
import ProjectProvider from './ProjectProvider'

// fetch relevant data to all subviews in this component
// provide userId from Routes component
const ProjectView = ({userId}) => {
  return (
    <ProjectProvider userId={userId}>
      {/* topLevelViewContainer should be used for all top-level view components */}
      <div className="topLevelViewContainer">
        <Board />
      </div>
    </ProjectProvider>
  )
}

export default ProjectView
