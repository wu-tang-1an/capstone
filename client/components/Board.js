import React, {useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import {TaskContext} from '../context/taskContext'
import ColumnProvider from '../context/columnContext'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import styles from './css/Board.css'
import {DragDropContext} from 'react-beautiful-dnd'

const Board = () => {
  // get columns from ProjectContext
  const {project, columns} = useContext(ProjectContext)

  console.log('columns--->', columns)

  const columnsCopy = [...columns]
  console.log('columnsCopy--->', columnsCopy)

  const handleDragEnd = ({destination, source}) => {
    console.log('source from--->', source)
    console.log('destination to--->', destination)

    if (!destination) {
      console.log('not dropped!!!!')
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log('dropped in same place!!!!')
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="Board">
        <h2>Project: {project.name}</h2>
        <div className={styles.boardContainer}>
          {columns.map((column) => (
            <ColumnProvider key={column.id} columnId={column.id}>
              <Column columnId={column.id} />
            </ColumnProvider>
          ))}
          <AddColumnDropDown />
        </div>
      </div>
    </DragDropContext>
  )
}

export default Board
