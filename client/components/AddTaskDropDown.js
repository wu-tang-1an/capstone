import React from 'react'
import styles from './css/AddTaskDropDown.css'

const AddTaskDropDown = ({cancel}) => {
  return (
    <div className={styles.addTaskDropDownContainer}>
      <textarea className={styles.description}></textarea>
      <div className="btnContainer">
        <button type="button">Add task</button>
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddTaskDropDown
