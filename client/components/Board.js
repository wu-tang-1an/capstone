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

    // index of column dragged from
    const sourColIdx = columns.findIndex(
      (col) => col.id === +source.droppableId
    )

    // index of column dropped into
    const destColIdx = columns.findIndex(
      (col) => col.id === +destination.droppableId
    )

    console.log('columns: ', columns)
    console.log('sourColIdx: ', sourColIdx)
    console.log('destColIdx: ', destColIdx)

    // copy array of tasks from source
    const sourTasks = Array.from(columns[sourColIdx].tasks)

    const moveTask = sourTasks.find((tas) => tas.id === +draggableId)

    console.log('oldSourTasks: ', columns[sourColIdx].tasks)
    console.log('oldDestTasks: ', columns[destColIdx].tasks)
    console.log('moveTask: ', moveTask)

    // remove task from source tasks array
    sourTasks.splice(source.index, 1)

    // copy array of tasks from destination
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourTasks
        : Array.from(columns[destColIdx].tasks)

    // add task to destination tasks array
    destTasks.splice(destination.index, 0, moveTask)

    console.log('sourTasks: ', sourTasks)
    console.log('destTasks: ', destTasks)

    // create new source column with updated tasks array
    const sourColumn = {
      ...columns[sourColIdx],
      tasks: sourTasks,
    }

    // create new destination column with our updated tasks array
    const destColumn = {
      ...columns[destColIdx],
      tasks: destTasks,
    }

    const newColumns = Array.from(columns)
    newColumns[sourColIdx] = sourColumn
    newColumns[destColIdx] = destColumn

    console.log('sourColumn: ', sourColumn)
    console.log('destColumn: ', destColumn)
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
