import React, {useState, useContext} from 'react'
import {OrganizationContext} from '../context/organizationContext'
import {createProjectDb, getOrgDb} from '../context/axiosService'
import {notify} from './helper/toast'
import styles from './css/AddProjectModal.module.css'

// helper sends errors to toastify
const validate = (name) => {
  let errors = []
  if (!name.length) errors.push('Name must not be empty!')
  return errors
}

const AddProjectModal = ({orgId, projects, setProjects, closeModal}) => {
  // init local state
  const [name, setName] = useState('')
  const [description, setDescription] = useState()
  const [imageUrl, setImageUrl] = useState()

  const createProject = async () => {
    // set an errors array
    const errors = validate(name)

    // early return if project name empty
    if (errors.length) {
      errors.forEach((error) => {
        notify(error, 'error')
      })

      return
    }

    // create project
    const createdProject = await createProjectDb(orgId, {
      name: name,
      description: description,
      imageUrl: imageUrl,
    })

    // update projects state on org context to trigger rerender
    setProjects([...projects, createdProject])

    // close modal and toastify
    closeModal()
    notify(`Project "${name}" created!`, 'success')
  }

  return (
    <div className={styles.addDropDownContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.labelAndInput}>
          <label htmlFor="">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className={styles.labelAndInput}>
          <label htmlFor="">Image url</label>
          <input
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
          ></input>
        </div>
        <div className={styles.labelAndInput}>
          <label htmlFor="">Description</label>
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.createProjectBtn}
          type="button"
          onClick={createProject}
        >
          Create My Project
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default AddProjectModal
