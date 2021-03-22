import React, {useContext} from 'react'
import {ProjectContext} from './ProjectProvider'
import styles from './DeleteTaskModal.css'

const DeleteTaskModal = (props) => {
  const {tasks, setTasks} = useContext(ProjectContext)

  const {taskId, closeModal} = props

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
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
