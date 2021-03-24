import React, {useContext} from 'react'
import styles from './css/AddColumnDialog.css'
import {ProjectContext} from '../context/projectContext'
import {ColumnContext} from '../context/columnContext'

const AddColumnDialog = ({cancel}) => {
  // grab project from project context
  const {project, setProject} = useContext(ProjectContext)

  // grab columns from column context
  const {columns, setColumns} = useContext(ColumnContext)

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
