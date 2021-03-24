import React, {useState, useContext} from 'react'
import styles from './css/AddTaskDialog.css'
import {AuthContext} from '../context/authContext'
import {ColumnContext} from '../context/columnContext'
import {addTaskToColumnDB} from '../context/axiosService'

import axios from 'axios'

const AddTaskDialog = ({cancel}) => {
  // grab user from auth context
  const {user, setUser} = useContext(AuthContext)

  // grab column and tasks, setTasks from column context
  const {column, tasks, setTasks} = useContext(ColumnContext)

  // initialize local state for new task description
  const [description, setDescription] = useState('')

  // add task method updates db and closes the dialog
  const addTask = async (e) => {
    e.preventDefault()

    const newTask = {
      description,
      completionDate: new Date().toISOString(),
      status: 'in-progress',
      userId: user.id,
    }

    try {
      const createdTask = await addTaskToColumnDB(newTask, column.id)
      setTasks([...tasks, createdTask])
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
