import React from 'react'
import Column from './Column'

const fakeDb = [
  {
    id: 1,
    name: 'Todo',
  },
  {
    id: 2,
    name: 'In-progress',
  },
  {
    id: 3,
    name: 'Review',
  },
  {
    id: 4,
    name: 'Done',
  },
]

const Board = (props) => {
  // const {columns} = props

  // fakeDb, remove when connected to real db
  const columns = fakeDb

  return (
    <div className="boardContainer">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  )
}

export default Board
