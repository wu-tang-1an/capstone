import React, {useState, useContext} from 'react'
import styles from './css/AddMemberModal.module.css'
import {AuthContext} from '../context/authContext'
import {sendInvite} from '../context/axiosService'
import {notify} from './helper/toast'

const AddMemberModal = ({orgId, closeModal}) => {
  const {user} = useContext(AuthContext)

  // local state mgmt
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')

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
        <button type="button" className={styles.addBtn} onClick={closeModal}>
          Add
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddMemberModal
