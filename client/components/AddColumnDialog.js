import React, {useState, useContext} from 'react'
import styles from './css/AddDialogShared.module.css'
import {ProjectContext} from '../context/projectContext'
import {addColumnDB} from '../context/axiosService'
import socket, {socketSent} from '../socket'
import {notify} from './helper/toast'
import axios from 'axios'

const AddColumnDialog = ({closeModal}) => {
  // grab project and its columns and setters from project context
  const {project, columns, setColumns} = useContext(ProjectContext)

  // initialize local state for new column name
  const [name, setName] = useState('')

  // add column method updates db and closes the dialog
  const addColumn = async (e) => {
    e.preventDefault()

    // get new column instance for addColumnDB call
    const newColumn = {
      name: name,
    }

    try {
      // create new column
      const createdColumn = await addColumnDB(newColumn)

      // associate new column with project
      await axios.put(
        `/api/columns/${createdColumn.id}/projects/${project.id}/`
      )

      // set local column state
      setColumns([...columns, createdColumn])
      closeModal()

      // do NOT close dialog
      // allows user to create multiple columns without
      // having to repeatedly click the + button
      notify('Column successfully created!', 'success')
    } catch (err) {
      console.error(err)
    }

    socket.emit(socketSent.ADD_COLUMN, {
      ignoreUser: socket.id,
      projectId: project.id,
    })
  }

  return (
    <div className={styles.addDropDownContainer}>
      <textarea
        className={styles.description}
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></textarea>
      <div className={styles.btnContainer}>
        <button type="button" className={styles.addBtn} onClick={addColumn}>
          Add column
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default AddColumnDialog
