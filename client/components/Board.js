import React, {useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import styles from './css/Board.css'

const Board = () => {
  // get columns from ProjectContext
  const {project, columns} = useContext(ProjectContext)

  return (
    <div className="Board">
      <h2>Project: {project.name}</h2>
      <div className={styles.boardContainer}>
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <AddColumnDropDown />
      </div>
    </div>
  )
}

export default Board
