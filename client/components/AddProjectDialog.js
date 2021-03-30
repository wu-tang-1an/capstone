import React from 'react'

import styles from './css/AddDialogShared.module.css'

const AddProjectDialog = ({closeModal}) => {
  return (
    <div className={styles.addDropDownContainer}>
      <textarea
        className={styles.description}
        // onChange={(e) => setName(e.target.value)}
      ></textarea>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          //   onClick={() => {}}
        >
          Add
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default AddProjectDialog
