import React, {useState, useContext} from 'react'
import Modal from './Modal'
import {addOrganizationDB} from '../context/axiosService'
import {AuthContext} from '../context/authContext'
import styles from './css/AddOrganizationDialog.css'

const NewOrganizationForm = ({createOrganization, closeModal}) => {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  return (
    <form>
      <div className={styles.formField}>
        <label htmlFor="Organization name" />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.formField}>
        <pre>
          <img src={imageUrl} />
        </pre>
      </div>

      <div className={styles.formField}>
        <label htmlFor="Organization image" />
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          createOrganization({name, imageUrl})
          closeModal()
        }}
      >
        Create My Organization
      </button>
    </form>
  )
}

const AddOrganizationDialog = ({organizations, setOrganizations}) => {
  const [isModalVisible, setModalVisible] = useState(false)

  const createOrganization = async (newOrg) => {
    try {
      const createdOrg = await addOrganizationDB(newOrg)
      setOrganizations([...organizations, createdOrg])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addOrgContainer}>
      {isModalVisible && (
        <Modal>
          <NewOrganizationForm
            createOrganization={createOrganization}
            closeModal={() => setModalVisible(false)}
          />
        </Modal>
      )}
      <button
        type="button"
        className={styles.createOrgBtn}
        onClick={() => {
          setModalVisible(true)
        }}
      >
        + Create A New Organization
      </button>
    </div>
  )
}

export default AddOrganizationDialog
