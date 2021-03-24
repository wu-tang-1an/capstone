import React, {useContext} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {ProjectContext} from '../context/projectContext'
import ColumnProvider from '../context/columnContext'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import styles from './css/Board.css'

const onDragEnd = (result) => {
  // TODO
}

const Board = () => {
  // get columns from ProjectContext
  const {project, columns} = useContext(ProjectContext)

  return (
    <div className="Board">
      <h2>Project: {project.name}</h2>
      <div className={styles.boardContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <ColumnProvider key={column.id} columnId={column.id}>
              <Column />
            </ColumnProvider>
          ))}
        </DragDropContext>
        <AddColumnDropDown />
      </div>
    </div>
  )
}

export default Board
