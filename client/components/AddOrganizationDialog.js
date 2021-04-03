import React, {useState} from 'react'
import Modal from './Modal'
import styles from './css/AddOrganizationDialog.css'

const NewOrganizationForm = () => {
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
          // do the logic that makes an org
        }}
      >
        Create My Organization
      </button>
    </form>
  )
}

const AddOrganizationDialog = () => {
  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <div className={styles.addOrgContainer}>
      {isModalVisible && (
        <Modal>
          <NewOrganizationForm closeModal={() => setModalVisible(false)} />
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
