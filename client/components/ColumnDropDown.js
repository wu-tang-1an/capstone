import React from 'react'
import styles from './css/ColumnDropDown.css'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit column name'},
  {id: 2, content: 'Manage automation'},
  {id: 3, content: 'Delete column'},
  // more fields as necessary
]

const ColumnDropDown = () => {
  return (
    <div className={styles.columnDropDownContainer}>
      {fields.map((field) => (
        // onClick, reveal a dropdown with clickable links for each field
        <div key={field.id} className={styles.dropDownField}>
          <span className={styles.fieldName}>{field.content}</span>
          <span className="material-icons">keyboard_arrow_right</span>
        </div>
      ))}
    </div>
  )
}
export default ColumnDropDown
