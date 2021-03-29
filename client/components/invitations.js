import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import {FcInvite} from 'react-icons/fc'
import {IconContext} from 'react-icons'
import styles from './css/Invitations.css'

const Invitations = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize all orgs state
  const [invites, setInvitations] = useState([])
  console.log('organizations---->', invites)

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

  async function acceptInvite(userId, orgId) {
    console.log('we hit hereeeeee')
    try {
      await axios.put(`/api/users/${userId}/organizations/${orgId}`, {})
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
                  <button
                    className={styles.accept}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      acceptInvite(user.id, invite.orgId)
                    }}
                  >
                    Accept
                  </button>
                  <button className={styles.decline} type="submit">
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
