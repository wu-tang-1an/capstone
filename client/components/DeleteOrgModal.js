import React from 'react'
import Modal from './Modal'
import styles from './css/DeleteOrgModal.module.css'

const DeleteOrgModal = ({
  currentOrgId,
  deleteOrg,
  organizations,
  closeModal,
}) => {
  const thisOrg = organizations.find((org) => org.id === currentOrgId)

  return (
    <Modal>
      <div className={styles.modalContent}>
        <div className={styles.deleteMessage}>
          <strong>Warning!</strong> This action will delete the project "
          {thisOrg.name}" and{' '}
          <strong>all columns and tasks associated with it.</strong>
          <br /> Press <span>Delete project</span> to continue, or cancel to go
          back.
        </div>
        <div className={styles.modalBtnsContainer}>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => {
              deleteOrg(thisOrg)
              closeModal()
            }}
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

export default DeleteOrgModal
