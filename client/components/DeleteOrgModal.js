import React from 'react'
import Modal from './Modal'
import {deleteOrganizationDB} from '../context/axiosService'
import {notify} from './helper/toast'
import styles from './css/DeleteOrgModal.module.css'

const DeleteOrganizationModal = ({
  organization,
  organizations,
  setOrganizations,
  closeModal,
}) => {
  // destructure organization
  const {id, name} = organization

  const deleteOrg = async () => {
    // close the modal BEFORE changing state
    closeModal()

    // delete project from db
    await deleteOrganizationDB(id)

    // set all orgs local state
    setOrganizations(organizations.filter((org) => org.id !== id))

    notify(`Project "${name}" deleted!`, 'warning')
  }

  return (
    <Modal>
      <div className={styles.modalContent}>
        <div className={styles.deleteMessage}>
          <strong>Warning!</strong> This action will delete the project "{name}"
          and <strong>all columns and tasks associated with it.</strong>
          <br /> Press <span>Delete project</span> to continue, or cancel to go
          back.
        </div>
        <div className={styles.modalBtnsContainer}>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={deleteOrg}
          >
            Delete Project
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteOrganizationModal
