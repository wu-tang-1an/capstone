import React, {useState, useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import Modal from './Modal'
import axios from 'axios'
import socket from '../socket'
import styles from './css/ColumnDropDown.css'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit column name'},
  {id: 3, content: 'Delete column'},
  // more fields as necessary
]

const ColumnDropDown = ({columnId, closeDropDown}) => {
  // grab project, columns, columns setter from project context
  const {project, columns, setColumns} = useContext(ProjectContext)

  // initialize local state to track current field, which is the type of operation the user wants to perform
  const [currentField, setCurrentField] = useState('')
  const [name, setName] = useState(
    columns.find((column) => column.id === columnId).name
  )

  // editColumn method renames column and persists to db, local state
  const editColumn = async () => {
    try {
      // update column
      const {data} = await axios.put(`/api/columns/${columnId}`, {
        name: name,
      })

      const updatedColumns = columns.map((column) =>
        column.id === data.id ? data : column
      )

      setColumns(updatedColumns)

      socket.emit('edit-column-name', {
        ignore: socket.id,
        newColumns: updatedColumns,
      })
    } catch (err) {
      console.error(err)
    }
  }

  // deleteColumn method deletes column from db and local state
  const deleteColumn = async () => {
    try {
      // delete column from db
      await axios.delete(`/api/columns/${columnId}`)

      const updatedColumns = columns.filter((column) => column.id !== columnId)

      // remove column from project context's columns record
      setColumns(updatedColumns)

      socket.emit('delete-column', {
        ignore: socket.id,
        newColumns: updatedColumns,
      })
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
          <div className={styles.modalContent}>
            <div className={styles.deleteMessage}>
              <strong>Warning!</strong> This action will delete the selected
              column and <strong>all cards associated with it.</strong>
              <br /> Press <span>Delete column</span> to continue, or cancel to
              go back.
            </div>
            <div className={styles.modalBtnsContainer}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={deleteColumn}
              >
                Delete Column
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={closeDropDown}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      {currentField === 'Edit column name' && (
        <Modal>
          <div className={styles.modalContent}>
            <div className={styles.newColumnName}>New column name</div>
            <input
              type="text"
              className={styles.columnNameInput}
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.modalBtnsContainer}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => {
                  editColumn()
                  closeDropDown()
                }}
              >
                Save
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={closeDropDown}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
export default ColumnDropDown
