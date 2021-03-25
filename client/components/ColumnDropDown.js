import React, {useState, useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import Modal from './Modal'
import axios from 'axios'
import styles from './css/ColumnDropDown.css'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit column name'},
  {id: 2, content: 'Manage automation'},
  {id: 3, content: 'Delete column'},
  // more fields as necessary
]

const ColumnDropDown = ({columnId, closeDropDown}) => {
  // grab project, columns, columns setter from project context
  const {project, columns, setColumns} = useContext(ProjectContext)

  // initialize local state to track current field, which is the type of operation the user wants to perform
  const [currentField, setCurrentField] = useState('')

  // deleteColumn method deletes column from db and local state
  const deleteColumn = async () => {
    try {
      // delete column from db
      await axios.delete(`/api/columns/${columnId}`)

      // remove column from project context's columns record
      setColumns(columns.filter((column) => column.id !== columnId))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.columnDropDownContainer}>
      {fields.map((field) => (
        // onClick, reveal a dropdown with clickable links for each field
        <div
          key={field.id}
          className={styles.dropDownField}
          onClick={() => setCurrentField(field.content)}
        >
          <span className={styles.fieldName}>{field.content}</span>
          <span className="material-icons">keyboard_arrow_right</span>
        </div>
      ))}
      {/* delete modal */}
      {currentField === 'Delete column' && (
        <Modal>
          <div>
            This action will delete the selected column, press "Delete column"
            to continue
          </div>
          <button type="button" onClick={deleteColumn}>
            Delete column
          </button>
          <button type="button" onClick={closeDropDown}>
            Close
          </button>
        </Modal>
      )}
    </div>
  )
}
export default ColumnDropDown
