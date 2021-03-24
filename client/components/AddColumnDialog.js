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

    const newColumn = {
      name: name,
    }

    try {
      const createdColumn = await addColumnDB(newColumn)

      await axios.put(
        `/api/columns/${createdColumn.id}/projects/${project.id}/`
      )

      setColumns([...columns, createdColumn])

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
