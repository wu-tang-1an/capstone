import React, {useState, useContext} from 'react'
import styles from './css/AddDialogShared.module.css'
import {AuthContext} from '../context/authContext'
import {addOrganizationDB, addUserToOrgDB} from '../context/axiosService'

const AddOrgDialog = ({closeModal}) => {
  const {user} = useContext(AuthContext)

  // local state mgmt
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // add organization method updates db and closes the dialog
  const addOrganization = async (e) => {
    e.preventDefault()

    const newOrganization = {
      name: name,
      imageUrl: imageUrl,
    }

    try {
      const createdOrganization = await addOrganizationDB(newOrganization)
      await addUserToOrgDB(createdOrganization.id, user.id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addDropDownContainer}>
      <form>
        <div>
          <label>Name:</label>
          <input
            className={styles.description}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Upload ImageUrl:</label>
          <input
            // type="file"
            className={styles.description}
            onChange={(e) => setImageUrl(e.target.value)}
          ></input>
        </div>
      </form>

      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={addOrganization}
        >
          Add
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default AddOrgDialog
