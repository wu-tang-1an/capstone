import React, {useContext} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {ProjectContext} from '../context/projectContext'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import styles from './css/Board.css'

const Board = () => {
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

    // index of column dropped into
    const columnIdx = columns.findIndex((col) => col.id === +source.droppableId)

    console.log('columns: ', columns)
    console.log('columnIdx: ', columnIdx)

    // copy array of tasks
    const newTasks = Array.from(columns[columnIdx].tasks)
    const moveTask = newTasks.find((tas) => tas.id === +draggableId)

    console.log('oldTasks: ', columns[columnIdx].tasks)
    console.log('moveTask: ', moveTask)

    newTasks.splice(source.index, 1)
    newTasks.splice(destination.index, 0, moveTask)

    console.log('newTasks: ', newTasks)

    const newColumn = {
      ...columns[columnIdx],
      tasks: newTasks,
    }

    const newColumns = Array.from(columns)
    newColumns[columnIdx] = newColumn

    console.log('newColumn: ', newColumn)
    console.log('newColumns: ', newColumns)

    setColumns(newColumns)
  }

  return (
    <div className="Board">
      <h2>Project: {project.name}</h2>
      <div className={styles.boardContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </DragDropContext>
        <AddColumnDropDown />
      </div>
    </div>
  )
}

export default Board
