import React, {useContext} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {ProjectContext} from '../context/projectContext'
import {dropUpdateDb} from '../context/axiosService'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import socket from '../socket'
import {notify} from './helper/toast'
import styles from './css/Board.css'

const Board = () => {
  const {
    project,
    columns,
    setColumns,
    refreshProjectBoard,
    taskChanged,
    setTaskChanged,
  } = useContext(ProjectContext)

  // drop logic
  const onDragEnd = (result) => {
    const {draggableId, source, destination} = result

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

    // copy array of tasks from source
    const sourTasks = Array.from(columns[sourColIdx].tasks)

    const moveTask = sourTasks.find((tas) => tas.id === +draggableId)

    // remove task from source tasks array
    sourTasks.splice(source.index, 1)

    // assign tasks index in the array to the tasks index property
    for (let i = source.index; i < sourTasks.length; ++i) {
      sourTasks[i].index = i
    }

    // copy array of tasks from destination
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourTasks
        : Array.from(columns[destColIdx].tasks || [])

    // add task to destination tasks array
    destTasks.splice(destination.index, 0, moveTask)

    // assign tasks index in the array to the tasks index property
    for (let i = destination.index; i < destTasks.length; ++i) {
      destTasks[i].index = i
    }

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

    setColumns(newColumns)

    dropUpdateDb(
      sourColumn.id,
      destColumn.id,
      sourTasks,
      destTasks,
      moveTask.id
    )

    // broadcast drag and drop changes
    // send a payload with ignore
    socket.emit('move-task', {ignore: socket.id, newColumns})
  }

  // socket logic
  socket.on('task-was-moved', ({ignore, newColumns}) => {
    // only refresh when other user actions occur
    if (socket.id === ignore) return
    // set columns rather than trigger rerender
    // otherwise card doesn't get its new index
    // and card moves glitch
    setColumns(newColumns)
  })
  socket.on('column-was-added', ({ignore}) => {
    if (socket.id === ignore) return
    setTaskChanged(!taskChanged)
  })
  socket.on('column-was-deleted', ({ignore}) => {
    if (socket.id === ignore) return
    setTaskChanged(!taskChanged)
  })
  socket.on('column-name-was-edited', ({ignore}) => {
    if (socket.id === ignore) return
    setTaskChanged(!taskChanged)
  })
  socket.on('task-was-added', ({ignore}) => {
    if (socket.id === ignore) return
    setTaskChanged(!taskChanged)
  })
  socket.on('task-was-deleted', ({ignore}) => {
    if (socket.id === ignore) return
    setTaskChanged(!taskChanged)
  })

  // task edits require some update work
  socket.on('task-was-edited', ({ignore, updatedTask}) => {
    if (socket.id === ignore) return

    const updatedColumns = columns.map((column) => {
      // get an array of taskIds for each column's tasks
      const taskIds = column.tasks ? column.tasks.map((task) => task.id) : []

      // if this column doesn't include the updated task, return the column
      if (!taskIds.includes(updatedTask.id)) return column

      // otherwise, replace the task with the updatedTask received over socket connection
      const updatedTasks = column.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )

      // replace the column's task array with the updated tasks and return
      column.tasks = updatedTasks
      return column
    })

    // after received updated columns, set them
    setColumns(updatedColumns)
  })

  // comments ???
  /* socket.on('comment-was-edited', ({ignore}) => {
    if (socket.id === ignore) return
    setTaskChanged(!taskChanged)
  }) */

  return (
    <div>
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
