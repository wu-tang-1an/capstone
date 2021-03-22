import React from 'react'
import Board from './Board'

// fetch relevant data to all subviews in this component

const ProjectView = () => {
  return (
    // topLevelViewContainer should be used for all
    // top-level view components
    // <DndProvider className="topLevelViewContainer" backend={HTML5Backend}>
    //   <Board />
    // </DndProvider>
    <div className="topLevelViewContainer">
      <Board />
    </div>
  )
}

export default ProjectView
