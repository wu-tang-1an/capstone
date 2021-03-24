import React, {useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import ColumnProvider from '../context/columnContext'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import styles from './css/Board.css'
import {DragDropContext} from 'react-beautiful-dnd'

const Board = () => {
  // get columns from ProjectContext
  const {project, columns} = useContext(ProjectContext)

  return (
    <DragDropContext>
      <div className="Board">
        <h2>Project: {project.name}</h2>
        <div className={styles.boardContainer}>
          {columns.map((column) => (
            <ColumnProvider key={column.id} columnId={column.id}>
              <Column />
            </ColumnProvider>
          ))}
          <AddColumnDropDown />
        </div>
      </div>
    </DragDropContext>
  )
}

export default Board
