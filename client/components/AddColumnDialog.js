import React from 'react'
import styles from './css/AddColumnDialog.css'

const AddColumnDialog = ({cancel, taskOrColumn}) => {
  return (
    <div className={styles.addTaskDropDownContainer}>
      <textarea className={styles.description}></textarea>
      <div className={styles.btnContainer}>
        <button type="button" className={styles.addBtn}>
          Add task
        </button>
        <button type="button" className={styles.cancelBtn} onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddColumnDialog
