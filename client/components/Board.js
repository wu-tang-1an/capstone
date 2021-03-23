import React, {useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import ColumnProvider from '../context/columnContext'
import Column from './Column'
import styles from './css/Board.css'

const Board = () => {
  // get columns from ProjectContext
  const {columns} = useContext(ProjectContext)

  return (
    <div className="Board">
      <h2>Organization Board</h2>
      <div className={styles.boardContainer}>
        {columns.map((column) => (
          <ColumnProvider key={column.id} columnId={column.id}>
            <Column />
          </ColumnProvider>
        ))}
      </div>
    </div>
  )
}

export default Board
