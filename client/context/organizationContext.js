import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const OrganizationContext = React.createContext()

export default function OrganizationProvider({organizationId, children}) {
  // initialize organization-level state
  const [organization, setOrganization] = useState({})
  const [projects, setProjects] = useState([])

  // fetch organization by organizationId
  useEffect(() => {
    let isMounted = true

    const fetchSingleOrganization = async () => {
      try {
        const {data} = await axios.get(`/api/organizations/${organizationId}`)
        setOrganization(data || {})
      } catch (err) {
        console.error(err)
      }
    }
    fetchSingleOrganization()

    return () => {
      isMounted = false
    }
  }, [])

  // this check prevents endless rerenders due to setting projects after successfully fetching the current organization
  if (!projects.length && organization.projects)
    setProjects(organization.projects)

  const providerValue = useMemo(() => {
    return {
      organization,
      setOrganization,
      projects,
      setProjects,
    }
  }, [organization, projects])

  return (
    <OrganizationContext.Provider value={providerValue}>
      {children}
    </OrganizationContext.Provider>
  )
}
