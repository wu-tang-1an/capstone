import React from 'react'
import Modal from './Modal'
import styles from './css/DeleteTaskModal.module.css'

const RemoveOrgModal = ({org, deleteOrganization, showModal, setShowModal}) => {
  return (
    <div>
      {showModal ? (
        <div showModal={showModal}>
          <div className={styles.modalContent}>
            <div className={styles.deleteMessage}>
              <strong>Warning!</strong> This action will remove you from the
              selected Organization. <br /> Press <span>Remove</span> to
              continue, or cancel to go back.
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
                onClick={() => setShowModal((prev) => !prev)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default RemoveOrgModal
