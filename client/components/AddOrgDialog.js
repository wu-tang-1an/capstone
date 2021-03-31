import React, {useState, useContext} from 'react'
import styles from './css/AddDialogShared.module.css'
import {AuthContext} from '../context/authContext'
import {addOrganizationDB, addUserToOrgDB} from '../context/axiosService'

const AddOrgDialog = ({closeModal, organizations, setOrganizations}) => {
  const {user} = useContext(AuthContext)

  // local state mgmt
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // add organization method updates db and closes the dialog
  const addOrganization = async () => {
    // build the new org from local state
    const newOrganization = {
      name: name,
      imageUrl: imageUrl,
    }

    // create org and associate to user
    try {
      const createdOrganization = await addOrganizationDB(newOrganization)

      const associatedOrg = await addUserToOrgDB(
        createdOrganization.id,
        user.id
      )

      console.log('in addorgdialog, new org: ', associatedOrg)

      // this func was passed down through an intermediary
      setOrganizations([...organizations, associatedOrg])
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
