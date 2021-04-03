import React, {useState, useEffect, useContext} from 'react'
import {fetchUserInvites} from './axiosService'
import {AuthContext} from './authContext'

export const InvitationContext = React.createContext()

const InvitationProvider = ({children}) => {
  const {user} = useContext(AuthContext)

  const [invitations, setInvitations] = useState([])

  useEffect(() => {
    const getInvites = async () => {
      try {
        const fetchedInvites = await fetchUserInvites(user.id)
        setInvitations(fetchedInvites)
      } catch (err) {
        console.error(err)
      }
    }
    getInvites()
  }, [invitations])

  const providerValue = {
    invitations,
    setInvitations,
  }

  return (
    <InvitationContext.Provider value={providerValue}>
      {children}
    </InvitationContext.Provider>
  )
}

export default InvitationProvider
