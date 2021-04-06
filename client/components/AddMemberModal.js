import React, {useState, useContext} from 'react'
import styles from './css/AddMemberModal.module.css'
import {AuthContext} from '../context/authContext'
import {sendInvite} from '../context/axiosService'
import {notify} from './helper/toast'

import socket, {socketSent} from '../socket'

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
        const {id, firstName, lastName} = response.data
        const name = `${firstName} ${lastName} (${email})`
        notify(`${name} was invited!`, 'success')
        socket.emit(socketSent.SEND_INVITE, {invitedUserId: id})
      }
    } catch (err) {
      notify(`User was already invited!`, 'error')

      console.error(err)
    }
  }

  return (
    <div className={styles.addDropDownContainer}>
      <div className={styles.emailLabelAndInput}>
        <label htmlFor="email">Teammate email address</label>
        <input
          type="text"
          className={styles.userEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.statusContainer}>
        <label htmlFor="userPermissions">Choose permissions:</label>
        <div
          className={styles.statusRadioGroup}
          onChange={(e) => setRole(e.target.value)}
        >
          <input
            type="radio"
            id="user"
            name="permissions"
            value="user"
            defaultChecked
          />
          <label htmlFor="user">User</label>
          <input type="radio" id="admin" name="permissions" value="admin" />
          <label htmlFor="admin">Admin</label>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.inviteTeammateBtn}
          onClick={async () => {
            await inviteTeammate()
            closeModal()
          }}
        >
          Send Invitation
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddMemberModal
