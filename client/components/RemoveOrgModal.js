import React from 'react'
import Modal from './Modal'
import styles from './css/DeleteTaskModal.module.css'

const RemoveOrgModal = ({org, deleteOrganization, closeModalHandler, show}) => {
  return (
    <Modal>
      <div
        className={styles.modalContent}
        style={{
          transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        <div className={styles.deleteMessage}>
          <strong>Warning!</strong> This action will remove you from the
          selected Organization.
          <br /> Press <span>Remove</span> to continue, or cancel to go back.
        </div>
        <div className={styles.modalBtnsContainer}>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={(event) => {
              deleteOrganization(event, org)
            }}
          >
            Remove
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => {
              closeModalHandler()
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default RemoveOrgModal
