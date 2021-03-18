import React from 'react'
import Board from './Board'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'

// fetch relevant data to all subviews in this component

const ProjectView = (props) => {
  return (
    // topLevelViewContainer should be used for all
    // top-level view components
    <DndProvider className="topLevelViewContainer" backend={HTML5Backend}>
      <Board />
    </DndProvider>
  )
}

export default ProjectView
