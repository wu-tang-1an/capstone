import React, {useState} from 'react'
import Modal from './Modal'
import {notify} from './helper/toast'
import strConstraints from './helper/strConstrain'

import styles from './css/EditOrgModal.module.css'

const validate = (name, imageUrl) => {
  let errors = []

  if (!name.length) errors.push('Organization name must not be empty!')

  if (name > strConstraints.titleMaxChar)
    errors.push(
      `Organization name is limited to ${strConstraints.titleMaxChar} characters!`
    )

  if (!imageUrl.length) errors.push('URL must not be empty!')
  // implement check if valid url later

  return errors
}

const EditOrgModal = ({currentOrgId, editOrg, organizations, closeModal}) => {
  // grab org from organizations by orgId
  const thisOrg = organizations.find((org) => org.id === currentOrgId)

  // set local state
  const [name, setName] = useState(thisOrg.name)
  const [imageUrl, setImageUrl] = useState(thisOrg.imageUrl)

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

        <div className={styles.preContainer}>
          <pre>
            <img src={imageUrl} />
          </pre>
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
        <div className={styles.modalBtnsContainer}>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => {
              // validate edited inputs
              const errors = validate(name, imageUrl)
              if (errors.length) {
                return errors.forEach((error) => {
                  notify(error, 'error')
                })
              }
              editOrg(currentOrgId, {name: name, imageUrl: imageUrl})
              closeModal()
            }}
          >
            Save Organization Info
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

export default EditOrgModal
