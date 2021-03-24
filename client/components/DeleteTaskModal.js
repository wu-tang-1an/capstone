import React, {useContext} from 'react'
import styles from './css/DeleteTaskModal.css'
import axios from 'axios'

import {ColumnContext} from '../context/columnContext'

const DeleteTaskModal = ({taskId, closeModal}) => {
  const {tasks, setTasks} = useContext(ColumnContext)

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${taskId}`)
    } catch (err) {
      console.error(err)
    }

    setTasks(tasks.filter((task) => task.id !== taskId))
    closeModal()
  }

  return (
    <div className={styles.modalContent}>
      <div className={styles.deleteMessage}>
        This action will remove any cards associated with the column.
      </div>
      <div className={styles.modalBtnsContainer}>
        <button type="button" name="deleteBtn" onClick={deleteTask}>
          Delete Task
        </button>
        <button type="button" name="cancelBtn" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteTaskModal
