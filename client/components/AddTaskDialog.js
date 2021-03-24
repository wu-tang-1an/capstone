import React, {useState, useContext} from 'react'
import styles from './css/AddTaskDialog.css'
import {AuthContext} from '../context/authContext'
import {ProjectContext} from '../context/projectContext'
import {addTaskToColumnDB} from '../context/axiosService'
import axios from 'axios'

const AddTaskDialog = ({columnId, cancel}) => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // grab column and tasks, setTasks from column context
  const {columns, tasks, setTasks} = useContext(ProjectContext)

  // get this column
  const thisColumn = columns.find((column) => column.id === columnId)

  // initialize local state for new task description
  const [description, setDescription] = useState('')

  // add task method updates db and closes the dialog
  const addTask = async (e) => {
    e.preventDefault()

    const newTask = {
      description,
      completionDate: new Date().toISOString(),
      status: 'in-progress',
      createdBy: user.firstName + ' ' + user.lastName,
    }

    try {
      const createdTask = await addTaskToColumnDB(newTask, thisColumn.id)

      await axios.put(`/api/tasks/${createdTask.id}/users/${user.id}`)

      setTasks([...tasks, createdTask])

      console.log(`tasks is: `, tasks)

      cancel()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addTaskDropDownContainer}>
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
        <button type="button" className={styles.cancelBtn} onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddTaskDialog
