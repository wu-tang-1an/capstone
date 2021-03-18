import React from 'react'
import Board from './Board'

// fetch relevant data to all subviews in this component

const ProjectView = (props) => {
  return (
    // topLevelViewContainer should be used for all
    // top-level view components
    <div className="topLevelViewContainer">
      <Board />
    </div>
  )
}

export default ProjectView
