import React, {useState, useContext} from 'react'
import styles from './css/AddDialogShared.module.css'
import {AuthContext} from '../context/authContext'
import {ProjectContext} from '../context/projectContext'
import {addTaskToColumnDB} from '../context/axiosService'
import socket, {socketSent} from '../socket'
import axios from 'axios'

const AddTaskDialog = ({columnId, closeTaskDialog}) => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // grab column and tasks, setTasks from column context
  const {project, columns, setColumns, tasks, setTasks} = useContext(
    ProjectContext
  )

  // get this column
  const thisColumn = columns.find((column) => column.id === columnId)

  // get this tasks
  const thisTasks = thisColumn.tasks || []

  // initialize local state for new task name
  const [name, setName] = useState('')

  // add task method updates db/local state before closing dialog
  const addTask = async (e) => {
    e.preventDefault()

    const newTask = {
      name,
      completionDate: new Date().toISOString(),
      editTimeStamp: new Date(),
      createdBy: user.firstName + ' ' + user.lastName,
      index: thisTasks.length ? thisTasks.length : 0,
    }

    try {
      // create new task
      const createdTask = await addTaskToColumnDB(newTask, thisColumn.id)

      // associate the new task with the user who created it
      await axios.put(`/api/tasks/${createdTask.id}/users/${user.id}`)

      // fetch the column that holds the new task
      const {data} = await axios.get(`/api/columns/${thisColumn.id}`)

      // get a new columns array
      const updatedColumns = columns.map((column) =>
        column.id === data.id ? data : column
      )

      // first update the column on local state
      setColumns(updatedColumns)

      // then update the local state tasks record
      setTasks([...tasks, createdTask])

      // do NOT close the task dialog -- this allows users
      // to create multiple cards without having to click the +
      // repeatedly!
      socket.emit(socketSent.ADD_TASK, {
        ignoreUser: socket.id,
        projectId: project.id,
        newColumns: updatedColumns,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addDropDownContainer}>
      <textarea
        className={styles.name}
        onChange={(e) => setName(e.target.value)}
      ></textarea>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => addTask(e, name)}
        >
          Add task
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={closeTaskDialog}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default AddTaskDialog
