import React, {useState} from 'react'
import Modal from './Modal'
import {getOrgDb, updateProjectDb} from '../context/axiosService'
import {notify} from './helper/toast'

import styles from './css/EditProjectModal.module.css'

const validate = (name, imageUrl) => {
  let errors = []

  if (!name.length) errors.push('Name must not be empty!')
  if (!imageUrl.length) errors.push('URL must not be empty!')
  // implement check if valid url later

  return errors
}

const EditProjectModal = ({organization, project, setProjects, closeModal}) => {
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

    notify(`Project "${name}" updated!`, 'success')
  }

  return (
    <Modal>
      <div className={styles.modalContent}>
        <div className={styles.labelAndInput}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={styles.projectNameInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.labelAndInput}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className={styles.projectNameInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.labelAndInput}>
          <label htmlFor="imageUrl">Image url</label>
          <input
            type="text"
            className={styles.projectNameInput}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className={styles.statusContainer}>
          <label htmlFor="status">Status</label>
          <div
            className={styles.statusRadioGroup}
            onChange={(e) => setStatus(e.target.value)}
          >
            <input
              type="radio"
              id="in-progress"
              name="status"
              value="in-progress"
              defaultChecked={status === 'in-progress'}
            />
            <label htmlFor="status">In-progress</label>
            <input
              type="radio"
              id="complete"
              name="status"
              value="complete"
              defaultChecked={status === 'complete'}
            />
            <label htmlFor="admin">Complete</label>
          </div>
        </div>
        <div className={styles.modalBtnsContainer}>
          <button
            type="button"
            className={styles.editBtn}
            onClick={editProject}
          >
            Save Project Info
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
