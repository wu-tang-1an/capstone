import React, {useContext} from 'react'
import {TaskContext} from '../context/taskContext'
import styles from './css/DeleteTaskModal.css'

const DeleteTaskModal = ({closeModal}) => {
  const {task, setTask} = useContext(TaskContext)

  const deleteTask = (id) => {
    // backend
    // make axios call with axios service file
    // delete task
    // frontend
    // handled automatically by providers due to useEffect
  }

  return (
    <div className={styles.modalContent}>
      <div className={styles.deleteMessage}>
        This action will remove any cards associated with the column.
      </div>
      <div className={styles.modalBtnsContainer}>
        <button
          type="button"
          name="deleteBtn"
          onClick={() => deleteTask(taskId)}
        >
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
