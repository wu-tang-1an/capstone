import React, {useState, useContext} from 'react'
import Modal from './Modal'
import {addOrganizationDB} from '../context/axiosService'
import {AuthContext} from '../context/authContext'
import {notify} from './helper/toast'
import strConstraints from './helper/strConstrain'
import styles from './css/AddOrganizationDialog.module.css'

const NewOrganizationForm = ({
  userId,
  organizations,
  setOrganizations,
  closeModal,
}) => {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  return (
    <div className={styles.modalContent}>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          if (name.length > strConstraints.nameMaxChar)
            return notify(
              `Organization name is limited to ${strConstraints.nameMaxChar} characters!`,
              'error'
            )

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
            notify(
              `Organization ${createdOrg.name} successfully created!`,
              'success'
            )
          } catch (err) {
            console.error(err)
          }
        }}
      >
        <div className={styles.formField}>
          <label htmlFor="Organization name">Name</label>
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
          <label htmlFor="Organization image">Image url</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className={styles.modalBtnsContainer}>
          <button className={styles.createBtn} type="submit">
            Create Organization
          </button>
          <button
            className={styles.cancelBtn}
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
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
