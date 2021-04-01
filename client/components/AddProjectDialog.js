import React, {useState} from 'react'
import {createProjectDb, getOrgDb} from '../context/axiosService'
import {notify} from './helper/toast'

import styles from './css/AddDialogShared.module.css'

const validate = (name) => {
  let errors = []

  if (!name.length) errors.push('Name must not be empty!')

  return errors
}

const AddProjectDialog = ({organization, setProjects, closeModal}) => {
  const [name, setName] = useState('')

  const createProject = async () => {
    const errors = validate(name)

    if (errors.length) {
      errors.forEach((error) => {
        notify(error, 'error')
      })

      return
    }

    await createProjectDb(organization.id, {
      name: name,
    })

    // get new organization info from db
    const data = await getOrgDb(organization.id)

    // update projects state
    setProjects(data.projects || [])

    closeModal()

    notify(`Project ${name} created!`, 'success')
  }

  return (
    <div className={styles.addDropDownContainer}>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
      ></input>
      <div className={styles.btnContainer}>
        <button type="button" className={styles.addBtn} onClick={createProject}>
          Add
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default AddProjectDialog
