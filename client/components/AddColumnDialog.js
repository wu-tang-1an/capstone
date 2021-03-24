import React, {useState, useContext} from 'react'
import styles from './css/AddColumnDialog.css'
import {ProjectContext} from '../context/projectContext'
import {addColumnDB} from '../context/axiosService'
import axios from 'axios'

const AddColumnDialog = ({cancel}) => {
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

      // close dialog and dropdown
      cancel()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addColumnDropDownContainer}>
      <textarea
        className={styles.description}
        onChange={(e) => setName(e.target.value)}
      ></textarea>
      <div className={styles.btnContainer}>
        <button type="button" className={styles.addBtn} onClick={addColumn}>
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
