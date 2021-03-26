import React, {useContext, useState, useEffect} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {ProjectContext} from '../context/projectContext'
import {dropUpdateDb} from '../context/axiosService'
import Column from './Column'
import AddColumnDropDown from './AddColumnDropDown'
import DirectoryBar from './DirectoryBar'
import axios from 'axios'
import styles from './css/Board.css'

const Board = () => {
  const {project, columns, setColumns} = useContext(ProjectContext)
  const [organization, setOrganization] = useState({})

  useEffect(() => {
    let isMounted = true
    const fetchOrg = async () => {
      try {
        const {data} = await axios.get(
          `/api/organizations/${project.organizationId}`
        )
        setOrganization(data)
      } catch (err) {
        console.error(err)
      }
    }
    if (project && project.organizationId) fetchOrg()
    return () => {
      isMounted = false
    }
  }, [project])

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

    // copy array of tasks from destination
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourTasks
        : Array.from(columns[destColIdx].tasks || [])

    // add task to destination tasks array
    destTasks.splice(destination.index, 0, moveTask)

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

    dropUpdateDb(sourColumn.id, destColumn.id, moveTask.id)
  }

  return (
    <div>
      <DirectoryBar project={project} organization={organization} />
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
