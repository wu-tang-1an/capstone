import React from 'react'
import Column from './Column'

const Board = (props) => {
  const {columns} = props
  return (
    <div className="boardContainer">
      <Column name="Todo" />
      <Column name="In-progress" />
      <Column name="Review" />
      <Column name="Done" />
    </div>
  )
}

export default Board
