import React, {useContext} from 'react'
import Column from './Column'
import AddButton from './AddButton'
import styles from './Board.css'
import {ProjectContext} from './ProjectProvider'

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

const Board = () => {
  // const {columns} = props

  // fakeDb, remove when connected to real db
  const columns = fakeDb

  const {tasks, setTasks, users, setUsers} = useContext(ProjectContext)
  console.log('users in board component, ', users)

  console.log('tasks in Board component, ', tasks)
  return (
    <div className="Board">
      <div className={styles.boardContainer}>
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <AddButton column />
      </div>
    </div>
  )
}

export default Board
