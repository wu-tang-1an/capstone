import React, {useState, useContext, useEffect} from 'react'
import styles from './css/AddDialogShared.css'

import {AuthContext} from '../context/authContext'

// import {addOrganizationDB} from '../context/axiosService'

import axios from 'axios'

const AddOrgDialog = ({closeModal}) => {
  // grab user from Auth context

  const {user} = useContext(AuthContext)

  // initialize local state for new column name
  const [name, setName] = useState('')

  // initialize local state for new Organization name

  const [organizations, setOrganizations] = useState([])

  console.log('organizations---->', organizations)

  // add organization method updates db and closes the dialog
  const addOrganization = async (e) => {
    e.preventDefault()

    // get new column instance for addColumnDB call
    const newOrganization = {
      name: name,
    }

    try {
      const {data} = await axios.post(`/api/organizations`, newOrganization)

      // set local column state
      setOrganizations([...organizations, data])
    } catch (err) {
      console.error(err)
    }
  }

  console.log('organizations NOW!!!!---->', organizations)

  return (
    <div className={styles.addDropDownContainer}>
      <textarea
        className={styles.description}
        onChange={(e) => setName(e.target.value)}
      ></textarea>
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
