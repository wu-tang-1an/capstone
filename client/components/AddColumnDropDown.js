import React from 'react'
import styles from './css/AddColumnDropDown.css'

const AddColumnDropDown = () => {
  return (
    <div className={styles.addColumnDropDownContainer}>
      <div className={styles.content}>
        <span className="material-icons">add</span>
        <span className={styles.description}>Add a column</span>
      </div>
    </div>
  )
}

export default AddColumnDropDown
