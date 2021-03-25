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
  const {columns, setColumns, tasks, setTasks} = useContext(ProjectContext)

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

      const {data} = await axios.get(`/api/columns/${thisColumn.id}`)

      console.log('updatedColumn is: ', data)

      // the next two calls look inefficient but are absolutely necessary due to an unknown render issue that prevents us from setting tasks directly without first rendering the new column

      setColumns(
        columns.map((column) => (column.id === data.id ? data : column))
      )

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
