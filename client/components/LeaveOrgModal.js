import React from 'react'
import styles from './css/DeleteTaskModal.module.css'

const LeaveOrgModal = ({leaveOrg, closeModal}) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.deleteMessage}>
        <strong>Warning!</strong> This action will remove the current user from
        the selected organization.
        <br /> Press <span>Leave Organization</span> to continue, or cancel to
        go back.
      </div>
      <div className={styles.modalBtnsContainer}>
        <button type="button" className={styles.deleteBtn} onClick={leaveOrg}>
          Leave Organization
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default LeaveOrgModal
