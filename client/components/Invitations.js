import React, {useContext} from 'react'
import {updateUserRoleDB, deleteInviteDB} from '../context/axiosService'
import {AuthContext} from '../context/authContext'
import styles from './css/Invitations.module.css'

const SingleInvitation = ({invite, userId, invitations, setInvitations}) => {
  const {id, orgId, orgPicture, orgName, role} = invite

  const acceptInvite = async () => {
    try {
      await updateUserRoleDB(userId, orgId, id, role)
      setInvitations(invitations.filter((invitation) => invitation.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const declineInvite = async () => {
    try {
      await deleteInviteDB(id)
      setInvitations(invitations.filter((invitation) => invitation.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.inviteContainer}>
      <img src={orgPicture} />
      <div className={styles.nameAndIcons}>
        <div className={styles.orgName}>{orgName}</div>
        <div className={styles.acceptAndDecline}>
          <div className={styles.textAndIcon} onClick={acceptInvite}>
            <i className="material-icons" style={{color: 'green'}}>
              check_circle_outline
            </i>
            <span>Accept </span>
          </div>
          <div className={styles.textAndIcon} onClick={declineInvite}>
            <i className="material-icons" style={{color: 'red'}}>
              highlight_off
            </i>
            <span>Decline </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Invitations = ({invitations, setInvitations}) => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  return (
    <React.Fragment>
      <div className={styles.invitationsHeader}>My invitations</div>
      <div className={styles.allInvitesContainer}>
        {invitations.map((invite) => (
          <SingleInvitation
            key={invite.id}
            invite={invite}
            userId={user.id}
            invitations={invitations}
            setInvitations={setInvitations}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default Invitations
