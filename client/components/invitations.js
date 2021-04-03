import React, {useState, useContext, useEffect} from 'react'
import {
  fetchUserInvites,
  updateUserRoleDB,
  deleteInviteDB,
} from '../context/axiosService'
import {Link} from 'react-router-dom'
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
    <div className={styles.singleOrgContainer}>
      <div>
        <img src={orgPicture} />
      </div>
      <div className={styles.orgNameCont}>
        <h3 className={styles.orgName}>{orgName}</h3>
      </div>
      <div className={styles.buttonCont}>
        <Link
          to={`/organizations/${orgId}`}
          className={styles.acceptBtn}
          type="button"
          onClick={() => {
            acceptInvite(orgId, inviteId, role)
          }}
        >
          Accept
        </Link>
        <button
          className={styles.declineBtn}
          type="button"
          onClick={() => {
            declineInvite(inviteId)
          }}
        >
          Decline
        </button>
      </div>
    </div>
  )
}

const Invitations = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize all orgs state
  const [invites, setInvitations] = useState([])

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

  const acceptInvite = async (orgId, inviteId, role) => {
    try {
      await updateUserRoleDB(user.id, orgId, inviteId, role)
      setInvitations(invites.filter((invite) => invite.id !== inviteId))
    } catch (error) {
      console.log(error)
    }
  }

  const declineInvite = async (inviteId) => {
    try {
      await deleteInviteDB(inviteId)
      setInvitations(invites.filter((invite) => invite.id !== inviteId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.invitesContainer}>
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
  )
}

export default Invitations
