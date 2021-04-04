import React, {useState, useContext} from 'react'
import styles from './css/AddMemberModal.module.css'
import {AuthContext} from '../context/authContext'
import {sendInvite} from '../context/axiosService'
import {notify} from './helper/toast'

// map roles to select options
const roles = [
  {
    id: 1,
    type: 'user',
  },
  {
    id: 2,
    type: 'admin',
  },
  // more select options as necessary here
]

const AddMemberModal = ({orgId, closeModal}) => {
  // grab user from auth context to send with invite
  const {user} = useContext(AuthContext)

  // local state mgmt
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')

  const inviteTeammate = async () => {
    // build new member from local state, props
    const newMember = {
      userEmail: email,
      orgId,
      inviter: user.id,
      role: role,
    }

    // send invite and process response
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
      <input
        type="text"
        className={styles.userEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select
        style={{marginBottom: '8px'}}
        value={role}
        onChange={(e) => {
          setRole(e.target.value)
        }}
      >
        {roles.map(({id, type}) => (
          <option key={id} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={async () => {
            await inviteTeammate()
            closeModal()
          }}
        >
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
