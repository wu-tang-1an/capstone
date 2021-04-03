import React, {useState, useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from './authContext'
import isAdmin from '../components/helper/isAdmin'
import {errorRedirect} from '../components/helper/errorHandle'

export const OrganizationContext = React.createContext()

const OrganizationProvider = ({match, children}) => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // grab orgId from match
  const organizationId = +match.params.organizationId

  // assign local state
  const [organization, setOrganization] = useState({})
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState(false)
  const [members, setMembers] = useState([])

  // fetch org
  useEffect(() => {
    let isMounted = true
    let org = {}
    let admin = false

    const fetchSingleOrg = async () => {
      try {
        org = await axios.get(`/api/organizations/${organizationId}`)
      } catch (err) {
        console.error(err)
        errorRedirect('/organizations')
      }
    }

    const fetchStatus = async () => {
      try {
        admin = await isAdmin(user.id, organizationId)
      } catch (e) {
        console.log(e)
      }
    }

    fetchSingleOrg().then(() => {
      if (isMounted) {
        setOrganization(org.data)
        setProjects(org.data.projects)
        setMembers(org.data.users)
      }
    })

    fetchStatus().then(() => {
      if (isMounted) setStatus(admin)
    })

    return () => {
      isMounted = false
    }
  }, [])

  // memoize to keep rerenders to a minimum
  const providerValue = {
    organization,
    setOrganization,
    projects,
    setProjects,
    members,
    setMembers,
    status,
    setStatus,
  }

  return (
    <OrganizationContext.Provider value={providerValue}>
      {children}
    </OrganizationContext.Provider>
  )
}

export default withRouter(OrganizationProvider)
