import React, {useState, useContext} from 'react'
import styles from './css/AddDialogShared.css'
import {AuthContext} from '../context/authContext'
import {ProjectContext} from '../context/projectContext'
import {addTaskToColumnDB} from '../context/axiosService'
import axios from 'axios'

const AddTaskDialog = ({columnId, closeTaskDialog}) => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // grab column and tasks, setTasks from column context
  const {columns, setColumns, tasks, setTasks} = useContext(ProjectContext)

  // get this column
  const thisColumn = columns.find((column) => column.id === columnId)

  // initialize local state for new task description
  const [description, setDescription] = useState('')

  // add task method updates db/local state before closing dialog
  const addTask = async (e) => {
    e.preventDefault()

    const newTask = {
      description,
      completionDate: new Date().toISOString(),
      status: 'in-progress',
      createdBy: user.firstName + ' ' + user.lastName,
    }

    try {
      // create new task
      const createdTask = await addTaskToColumnDB(newTask, thisColumn.id)

      // associate the new task with the user who created it
      await axios.put(`/api/tasks/${createdTask.id}/users/${user.id}`)

      // fetch the column that holds the new task
      const {data} = await axios.get(`/api/columns/${thisColumn.id}`)

      // first update the column on local state
      setColumns(
        columns.map((column) => (column.id === data.id ? data : column))
      )

      // then update the local state tasks record
      setTasks([...tasks, createdTask])

      // do NOT close the task dialog -- this allows users
      // to create multiple cards without having to click the +
      // repeatedly!
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addDropDownContainer}>
      <textarea
        className={styles.description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => addTask(e, description)}
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
