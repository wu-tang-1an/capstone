import React, {useContext} from 'react'
import {
  updateUserRoleDB,
  deleteInviteDB,
  getOrgDb,
} from '../context/axiosService'
import {AuthContext} from '../context/authContext'
import styles from './css/Invitations.module.css'

const SingleInvitation = ({
  inviteId,
  orgId,
  orgPicture,
  orgName,
  role,
  acceptInvite,
  declineInvite,
}) => {
  return (
    <div className={styles.inviteContainer}>
      <img src={orgPicture} />
      <div className={styles.nameAndIcons}>
        <div className={styles.orgName}>{orgName}</div>
        <div className={styles.acceptAndDecline}>
          <div
            className={styles.textAndIcon}
            onClick={() => {
              acceptInvite(orgId, inviteId, role)
            }}
          >
            <i className="material-icons" style={{color: 'green'}}>
              check_circle_outline
            </i>
            <span>Accept </span>
          </div>
          <div
            className={styles.textAndIcon}
            onClick={() => {
              declineInvite(inviteId)
            }}
          >
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

const Invitations = ({invitations}) => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // helper updates user role to associate to given orgId, updates local state
  const acceptInvite = async (orgId, inviteId, role) => {
    try {
      await updateUserRoleDB(user.id, orgId, inviteId, role)
      await deleteInviteDB(inviteId)
      const {data} = await getOrgDb(orgId)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // helper removes invite from db and updates local state
  const declineInvite = async (inviteId) => {
    try {
      await deleteInviteDB(inviteId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <div className={styles.invitationsHeader}>My invitations</div>
      <div className={styles.allinvitationsContainer}>
        {invitations.map((invite) => (
          <SingleInvitation
            key={invite.id}
            inviteId={invite.id}
            orgId={invite.orgId}
            orgPicture={invite.orgPicture}
            orgName={invite.orgName}
            role={invite.orgRole}
            acceptInvite={acceptInvite}
            declineInvite={declineInvite}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default Invitations
