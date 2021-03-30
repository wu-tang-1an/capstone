/* eslint-disable complexity */
import React, {useContext} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {ProjectContext} from '../context/projectContext'
import {dropUpdateDb} from '../context/axiosService'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import socket, {socketReceived, socketSent} from '../socket'
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
    socket.emit(socketSent.MOVE_TASK, {ignore: socket.id, newColumns})
  }

  // socket logic
  const {
    TASK_WAS_MOVED,
    COLUMN_WAS_ADDED,
    COLUMN_WAS_DELETED,
    COLUMN_NAME_WAS_EDITED,
    TASK_WAS_ADDED,
    TASK_WAS_DELETED,
    TASK_WAS_EDITED,
    COMMENT_WAS_ADDED,
    COMMENT_WAS_DELETED,
    COMMENT_WAS_EDITED,
  } = socketReceived

  socket.on(TASK_WAS_MOVED, ({ignore, newColumns}) => {
    // only refresh when other user actions occur
    if (socket.id === ignore) return
    // set columns rather than trigger rerender
    // otherwise card doesn't get its new index
    // and card moves glitch
    setColumns(newColumns)
  })

  socket.on(TASK_WAS_ADDED, ({ignore, newColumns}) => {
    if (socket.id === ignore) return
    setColumns(newColumns)
  })

  socket.on(TASK_WAS_DELETED, ({ignore, taskId}) => {
    if (socket.id === ignore) return
    setColumns(
      columns.map((column) => {
        if (!column.tasks.some((task) => task.id === taskId)) return column
        const updatedTasks = column.tasks.filter((task) => task.id !== taskId)
        column.tasks = updatedTasks
        return column
      })
    )
  })

  socket.on(COLUMN_WAS_DELETED, ({ignore, newColumns}) => {
    if (socket.id === ignore) return
    setColumns(newColumns)
  })

  socket.on(COLUMN_NAME_WAS_EDITED, ({ignore, newColumns}) => {
    if (socket.id === ignore) return
    setColumns(newColumns)
  })

  const OTHER_CRUD_OP =
    COLUMN_WAS_ADDED ||
    TASK_WAS_EDITED ||
    COMMENT_WAS_ADDED ||
    COMMENT_WAS_DELETED ||
    COMMENT_WAS_EDITED

  socket.on(OTHER_CRUD_OP, ({ignore}) => {
    if (socket.id === ignore) return
    setTaskChanged(!taskChanged)
  })

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
