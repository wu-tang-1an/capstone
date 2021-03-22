import React from 'react'
import Board from './Board'

// import the top-level provider here
// and *not* the deconstructed context itself!
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
