import React from 'react'
import styles from './css/DeleteTaskModal.module.css'

const RemoveOrgModal = ({show, close, org, deleteOrganization}) => {
  return (
    <div className={styles.modalContent}>
      <div
        className={styles.deleteMessage}
        styles={{
          transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        <strong>Warning!</strong> This action will remove you from the selected
        Organization.
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
        <button type="button" className={styles.cancelBtn} onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default RemoveOrgModal
