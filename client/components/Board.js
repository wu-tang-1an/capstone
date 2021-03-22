import React, {useContext} from 'react'
import Column from './Column'
import AddButton from './AddButton'
import styles from './Board.css'
import {ProjectContext} from './ProjectProvider'

const Board = () => {
  // useContext pulls in db data for use by downstream components
  const {tasks, setTasks, users, setUsers, columns, setColumns} = useContext(
    ProjectContext
  )

  // get list of column ids to pass to column
  // we'll use the columnId to pull the appropriate column
  // IN to the column component with useContext()
  const columnIds = columns.map((column) => column.id)
  const columnName = columns.map((column) => column.name)

  return (
    <div className="Board">
      <div className={styles.boardContainer}>
        {columnIds.map((columnId) => (
          <Column key={columnId} columnId={columnId} name={columnName} />
        ))}
        <AddButton column />
      </div>
    </div>
  )
}

export default Board
