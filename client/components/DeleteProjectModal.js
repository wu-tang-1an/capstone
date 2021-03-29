import React from 'react'
import Modal from './Modal'
import {deleteProjectDb, getOrgDb} from '../context/axiosService'
import styles from './css/DeleteTaskModal.css'

const DeleteProjectModal = ({
  project,
  organization,
  setProjects,
  closeModal,
}) => {
  const deleteProject = () => {
    // delete project from db
    deleteProjectDb(project.id)

    // get new organization info from db
    const data = getOrgDb(organization.id)

    // update projects state
    setProjects(data.projects)

    closeModal()
  }

  return (
    <Modal>
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
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProjectModal
