import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import {FcInvite} from 'react-icons/fc'
import {IconContext} from 'react-icons'
import styles from './css/Invitations.module.css'

const Invitations = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize all orgs state
  const [invites, setInvitations] = useState([])

  useEffect(() => {
    let isMounted = true
    const fetchInvites = async () => {
      try {
        const {data} = await axios.get(`/api/invitations/${user.id}/`)
        setInvitations(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInvites()

    return () => {
      isMounted = false
    }
  }, [])

  async function acceptInvite(userId, orgId, inviteId) {
    try {
      await axios.put(`/api/users/${userId}/organizations/${orgId}`, {})
      await axios.delete(`/api/invitations/${inviteId}`)
      setInvitations(invites.filter((invite) => invite.id !== inviteId))
    } catch (error) {
      console.log(error)
    }
  }

  async function declineInvite(inviteId) {
    try {
      await axios.delete(`/api/invitations/${inviteId}`)
      setInvitations(invites.filter((invite) => invite.id !== inviteId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {invites && (
        <div>
          <div className={styles.headerCont}>
            <h1 className={styles.allOrgsHeader}>Your Invitations</h1>
            <IconContext.Provider
              value={{size: '2rem', style: {marginTop: '0.7rem'}}}
            >
              <FcInvite />
            </IconContext.Provider>
          </div>
          <div className={styles.allOrgsCont}>
            {invites.map((invite) => (
              <div className={styles.orgCont} key={invite.id}>
                <div>
                  <img className={styles.orgImg} src={invite.orgPicture} />
                </div>
                <div className={styles.orgNameCont}>
                  <h3 className={styles.orgName}>{invite.orgName}</h3>
                </div>
                <div className={styles.buttonCont}>
                  <Link
                    to={`/organizations/${invite.orgId}`}
                    className={styles.accept}
                    type="submit"
                    onClick={(e) => {
                      acceptInvite(user.id, invite.orgId, invite.id)
                    }}
                  >
                    Accept
                  </Link>
                  <button
                    className={styles.decline}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      declineInvite(invite.id)
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Invitations
