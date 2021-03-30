import React, {useContext} from 'react'
import styles from './css/DeleteTaskModal.css'

import socket, {socketSent} from '../socket'

import axios from 'axios'
import {ProjectContext} from '../context/projectContext'

const DeleteTaskModal = ({task, closeModal}) => {
  // grab tasks, setTasks from column context
  const {project, columns, setColumns, tasks, setTasks} = useContext(
    ProjectContext
  )

  const deleteTask = async () => {
    const taskId = task.id
    try {
      await axios.delete(`/api/tasks/${task.id}`)

      const {data} = await axios.get(`/api/columns/${task.columnId}`)

      // the next two calls look inefficient but are absolutely necessary
      // to avoid memory leaks, we set columns before resetting tasks

      setColumns(
        columns.map((column) => (column.id === data.id ? data : column))
      )

      setTasks(tasks.filter((currTask) => currTask.id !== task.id))
    } catch (err) {
      console.error(err)
    }
    socket.emit(socketSent.DELETE_TASK, {
      ignoreUser: socket.id,
      projectId: project.id,
      taskId: taskId,
    })
  }

  return (
    <div className={styles.modalContent}>
      <div className={styles.deleteMessage}>
        <strong>Warning!</strong> This action will delete the selected task.
        <br /> Press <span>Delete task</span> to continue, or cancel to go back.
      </div>
      <div className={styles.modalBtnsContainer}>
        <button type="button" className={styles.deleteBtn} onClick={deleteTask}>
          Delete Task
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteTaskModal
