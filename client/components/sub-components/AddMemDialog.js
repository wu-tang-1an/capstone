import React, {useState, useContext} from 'react'
import styles from '../css/AddMemDialog.module.css'
import {AuthContext} from '../../context/authContext'
import {sendInvite} from '../../context/axiosService'
import {notify} from '../helper/toast'
const AddMemDialog = (props) => {
  const {user} = useContext(AuthContext)

  // local state mgmt
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')

  // add organization method updates db and closes the dialog
  const addOrganization = async (e) => {
    e.preventDefault()

    const newMember = {
      userEmail: email,
      orgId: props.orgId,
      inviter: user.id,
      role: role,
    }

    try {
      const response = await sendInvite(newMember)

      if (response.status === 200) {
        const {firstName, lastName} = response.data
        const name = `${firstName} ${lastName} (${email})`
        notify(`${name} was invited!`, 'success')
      }
    } catch (err) {
      notify(`User was already invited!`, 'error')

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
      <select
        style={{marginBottom: '8px'}}
        onChange={(e) => {
          setRole(e.target.value)
        }}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => {
            props.closeModal()
            addOrganization(e)
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
