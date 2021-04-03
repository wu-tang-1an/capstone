import React, {useState, useContext} from 'react'
import Modal from './Modal'
import {addOrganizationDB} from '../context/axiosService'
import {AuthContext} from '../context/authContext'
import styles from './css/AddOrganizationDialog.css'

const NewOrganizationForm = ({
  userId,
  organizations,
  setOrganizations,
  closeModal,
}) => {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        try {
          const createdOrg = await addOrganizationDB({
            userId,
            newOrg: {
              name,
              imageUrl,
            },
          })

          console.log(createdOrg)

          setOrganizations([...organizations, createdOrg])
          closeModal()
        } catch (err) {
          console.error(err)
        }
      }}
    >
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

      <button type="submit">Create My Organization</button>
    </form>
  )
}

const AddOrganizationDialog = ({organizations, setOrganizations}) => {
  const {user} = useContext(AuthContext)

  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <div className={styles.addOrgContainer}>
      {isModalVisible && (
        <Modal>
          <NewOrganizationForm
            userId={user.id}
            organizations={organizations}
            setOrganizations={setOrganizations}
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
