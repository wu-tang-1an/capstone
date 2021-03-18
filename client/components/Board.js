import React from 'react'
import Column from './Column'

const Board = (props) => {
  const {columns} = props
  return (
    <div className="boardContainer">
      {columns.map((column, idx) => (
        <Column key={idx} column={column} />
      ))}
    </div>
  )
}

export default Board
