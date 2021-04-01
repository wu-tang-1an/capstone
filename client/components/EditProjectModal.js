import React, {useState} from 'react'
import Modal from './Modal'
import {getOrgDb, updateProjectDb} from '../context/axiosService'
import {notify} from './helper/toast'

import styles from './css/ColumnDropDown.module.css'

const validate = (name, imageUrl) => {
  let errors = []

  if (!name.length) errors.push('Name must not be empty!')
  if (!imageUrl.length) errors.push('URL must not be empty!')
  // implement check if valid url later

  return errors
}

const EditProjectModal = ({project, organization, setProjects, closeModal}) => {
  const [name, setName] = useState(project.name)
  const [status, setStatus] = useState(project.status)
  const [description, setDescription] = useState(project.description)
  const [imageUrl, setImageUrl] = useState(project.imageUrl)

  const editProject = async () => {
    const errors = validate(name, imageUrl)

    if (errors.length) {
      errors.forEach((error) => {
        notify(error, 'error')
      })

      return
    }

    await updateProjectDb(project.id, {
      name: name,
      status: status,
      description: description,
      imageUrl: imageUrl,
    })

    // get new organization info from db
    const data = await getOrgDb(organization.id)

    // update projects state
    setProjects(data.projects || [])

    closeModal()
  }

  return (
    <Modal>
      <div className={styles.modalContent}>
        <div className={styles.newColumnName}>Edit project name</div>
        <input
          type="text"
          className={styles.columnNameInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.newColumnName}>Edit project description</div>
        <input
          type="text"
          className={styles.columnNameInput}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.newColumnName}>Edit project image URL</div>
        <input
          type="text"
          className={styles.columnNameInput}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className={styles.newColumnName}>Edit project status</div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="in-progress">in-progress</option>
          <option value="complete">complete</option>
        </select>
        <div className={styles.modalBtnsContainer}>
          <button
            type="button"
            className={styles.editBtn}
            onClick={editProject}
          >
            Save
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default EditProjectModal
