import React, {useState, useContext} from 'react'
import {ProjectContext} from '../context/projectContext'
import Modal from './Modal'
import axios from 'axios'
import socket, {socketSent} from '../socket'
import styles from './css/ColumnDropDown.module.css'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit column name'},
  {id: 2, content: 'Delete column'},
  {id: 3, content: 'Back'},
  // more fields as necessary
]

const ColumnDropDown = ({columnId, closeDropDown}) => {
  // grab project, columns, columns setter from project context

  console.log('columnId in Deee--->', columnId)

  const {project, columns, setColumns} = useContext(ProjectContext)

  console.log('columns in Drop--->', columns)

  // initialize local state to track current field, which is the type of operation the user wants to perform
  const [currentField, setCurrentField] = useState('')
  const [name, setName] = useState(
    columns.find((column) => column.id === columnId).name
  )

  // handle dropdown visibility by checking for currentField
  // if no currentField, dropdown is hidden
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(true)

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

      socket.emit(socketSent.EDIT_COLUMN_NAME, {
        ignoreUser: socket.id,
        projectId: project.id,
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

      socket.emit(socketSent.DELETE_COLUMN, {
        ignoreUser: socket.id,
        projectId: project.id,
        newColumns: updatedColumns,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <React.Fragment>
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
                onClick={() => closeDropDown()}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.colDropDownParent}>
        <div
          className={
            isVisibleDropDown
              ? styles.columnDropDownContainer
              : styles.columnDropDownContainerHidden
          }
        >
          {fields.map((field) => (
            // onClick, reveal a dropdown with clickable links for each field
            <div
              key={field.id}
              className={styles.dropDownField}
              onClick={() => {
                if (field.content === 'Back') return closeDropDown()
                setIsVisibleDropDown(false)
                setCurrentField(field.content)
              }}
            >
              <span className={styles.fieldName}>{field.content}</span>
              <span className="material-icons">keyboard_arrow_right</span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}
export default ColumnDropDown
