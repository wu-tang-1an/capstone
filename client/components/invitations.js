import React, {useState, useContext, useEffect} from 'react'
import history from '../history'
import {
  fetchUserInvites,
  updateUserRoleDB,
  deleteInviteDB,
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
          <div className={styles.textAndIcon}>
            <i
              className="material-icons"
              onClick={() => {
                acceptInvite(orgId, inviteId, role)
                history.push(`/organizations/`)
              }}
              style={{color: 'green'}}
            >
              check_circle_outline
            </i>
            <span>Accept </span>
          </div>
          <div className={styles.textAndIcon}>
            <i
              className="material-icons"
              onClick={() => {
                declineInvite(inviteId)
              }}
              style={{color: 'red'}}
            >
              highlight_off
            </i>
            <span>Decline </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Invitations = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize all orgs state
  const [invites, setInvitations] = useState([])

  // fetch invites
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const invitations = await fetchUserInvites(user.id)
        setInvitations(invitations)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInvites()
  }, [])

  // helper updates user role to associate to given orgId, updates local state
  const acceptInvite = async (orgId, inviteId, role) => {
    try {
      await updateUserRoleDB(user.id, orgId, inviteId, role)
      setInvitations(invites.filter((invite) => invite.id !== inviteId))
    } catch (error) {
      console.log(error)
    }
  }

  // helper removes invite from db and updates local state
  const declineInvite = async (inviteId) => {
    try {
      await deleteInviteDB(inviteId)
      setInvitations(invites.filter((invite) => invite.id !== inviteId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <div className={styles.invitesHeader}>My Invites</div>
      <div className={styles.allInvitesContainer}>
        {invites.map((invite) => (
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
