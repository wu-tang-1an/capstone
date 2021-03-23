import React, {useContext} from 'react'
import Column from './Column'
import AddButton from './AddButton'
import styles from './css/Board.css'
import {ProjectContext} from './ProjectProvider'
import AddButtonColumn from './AddButtonColumn'

const Board = () => {
  // useContext pulls in db data for use by downstream components
  const {tasks, setTasks, users, setUsers, columns, setColumns} = useContext(
    ProjectContext
  )

  // get list of column ids to pass to column
  // we'll use the columnId to pull the appropriate column
  // IN to the column component with useContext()
  const columnIds = columns.map((column) => column.id)
  const columnNames = columns.map((column) => column.name)

  return (
    <div className="Board">
      <h2>Organization Board</h2>
      <div className={styles.boardContainer}>
        {columns.map((column) => (
          <Column key={column.id} columnId={column.id} name={column.name} />
        ))}
        {/* <AddButtonColumn /> */}
        <AddButton column />
      </div>
    </div>
  )
}

export default Board
