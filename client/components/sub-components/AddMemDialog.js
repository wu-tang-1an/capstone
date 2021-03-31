import React, {useState, useContext} from 'react'
import styles from '../css/AddMemDialog.module.css'
import {AuthContext} from '../../context/authContext'
import {sendInvite} from '../../context/axiosService'

const AddMemDialog = (props) => {
  const {user} = useContext(AuthContext)

  // local state mgmt
  const [email, setEmail] = useState('')

  // add organization method updates db and closes the dialog
  const addOrganization = async (e) => {
    e.preventDefault()

    const newMember = {
      userEmail: email,
      orgId: props.orgId,
      inviter: user.id,
    }

    try {
      await sendInvite(newMember)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addDropDownContainer}>
      <textarea
        placeholder="Enter the new member's email..."
        className={styles.description}
        onChange={(e) => setEmail(e.target.value)}
        required
      ></textarea>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => {
            addOrganization()
            props.closeModal()
          }}
        >
          Add
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={props.closeModal}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default AddMemDialog
