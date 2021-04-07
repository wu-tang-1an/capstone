import React, {useState, useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {getOrgDb} from '../context/axiosService'
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
  const [authUserAdminStatus, setAuthUserAdminStatus] = useState(false)
  const [members, setMembers] = useState([])
  const [projectWasEdited, setProjectWasEdited] = useState(false)

  // fetch org
  useEffect(() => {
    let isMounted = true

    const fetchSingleOrg = async () => {
      try {
        const fetchedOrg = await getOrgDb(organizationId)
        return fetchedOrg
      } catch (err) {
        console.error(err)
        errorRedirect('/organizations')
      }
    }

    const fetchStatus = async () => {
      try {
        const fetchedStatus = await isAdmin(user.id, organizationId)
        return fetchedStatus
      } catch (err) {
        console.error(err)
      }
    }

    fetchSingleOrg().then((fetchedOrg) => {
      if (isMounted) {
        setOrganization(fetchedOrg)
        setProjects(fetchedOrg.projects)
        setMembers(fetchedOrg.users)
      }
    })

    fetchStatus().then((fetchedStatus) => {
      if (isMounted) setAuthUserAdminStatus(fetchedStatus)
    })

    return () => {
      isMounted = false
    }
  }, [projects.length, members.length, projectWasEdited])

  // memoize to keep rerenders to a minimum
  const providerValue = {
    organization,
    setOrganization,
    projects,
    setProjects,
    members,
    setMembers,
    authUserAdminStatus,
    setAuthUserAdminStatus,
    projectWasEdited,
    setProjectWasEdited,
  }

  return (
    <OrganizationContext.Provider value={providerValue}>
      {children}
    </OrganizationContext.Provider>
  )
}

export default withRouter(OrganizationProvider)
