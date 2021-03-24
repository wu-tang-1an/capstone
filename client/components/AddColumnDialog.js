import React from 'react'
import styles from './css/AddColumnDialog.css'

const AddColumnDialog = ({cancel}) => {
  return (
    <div className={styles.addColumnDropDownContainer}>
      <textarea className={styles.description}></textarea>
      <div className={styles.btnContainer}>
        <button type="button" className={styles.addBtn}>
          Add column
        </button>
        <button type="button" className={styles.cancelBtn} onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddColumnDialog
