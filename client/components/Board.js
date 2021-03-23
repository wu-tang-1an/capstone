import React, {useContext} from 'react'
import {ProjectContext} from './ProjectProvider'
import ColumnProvider from '../context/columnContext'
import Column from './Column'
import styles from './css/Board.css'

const Board = () => {
  // get project and columns from ProjectContext
  const {project, columns} = useContext(ProjectContext)

  return (
    <ColumnProvider>
      <div className="Board">
        <h2>Organization Board</h2>
        <div className={styles.boardContainer}>
          {columns.map((column) => (
            <Column key={column.id} columnId={column.id} />
          ))}
        </div>
      </div>
    </ColumnProvider>
  )
}

export default Board
