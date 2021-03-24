import React, {useContext} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {ProjectContext} from '../context/projectContext'
import ColumnProvider from '../context/columnContext'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import styles from './css/Board.css'

const Board = () => {
  // get columns from ProjectContext
  const {project, columns, setColumns} = useContext(ProjectContext)

  // drop logic
  const onDragEnd = (result) => {
    const {draggableId, source, destination} = result

    console.log('draggableId: ', draggableId)
    console.log('source: ', source)
    console.log('destination: ', destination)

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const column = columns.find((col) => col.id === +source.droppableId)

    console.log('columns: ', columns)
    console.log('column: ', column)

    const newTasks = Array.from(column.tasks)
    const moveTask = newTasks.find((task) => task.id === +draggableId)

    console.log('oldTasks: ', column.tasks)
    console.log('moveTask: ', moveTask)

    newTasks.splice(source.index, 1)
    newTasks.splice(destination.index, 0, moveTask)

    console.log('newTasks: ', newTasks)

    const newColumn = {
      ...column,
      tasks: newTasks,
    }

    console.log('newColumn: ', newColumn)

    const newColumns = [...columns]

    console.log('newColumns: ', newColumns)

    setColumns([newColumn])
  }

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
