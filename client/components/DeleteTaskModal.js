import React from 'react'
import styles from './css/DeleteTaskModal.css'

const DeleteTaskModal = ({deleteTask, closeModal}) => {
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
