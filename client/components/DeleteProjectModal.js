import React from 'react'
import styles from './css/DeleteTaskModal.css'

const DeleteProjectModal = ({deleteProject, closeModal}) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.deleteMessage}>
        <strong>Warning!</strong> This action will delete the selected project
        and <strong>all columns and tasks associated with it.</strong>
        <br /> Press <span>Delete project</span> to continue, or cancel to go
        back.
      </div>
      <div className={styles.modalBtnsContainer}>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={deleteProject}
        >
          Delete Project
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteProjectModal
