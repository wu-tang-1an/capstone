import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'

const SingleOrganization = ({match}) => {
  const {user, setUser} = useContext(AuthContext)

  // get orgId from route props
  const orgId = +match.params.organizationId

  // get thisOrg from orgs joined on user instance
  const thisOrg = user.organizations.find((org) => org.id === orgId)

  // destructure organization
  const {id, name, imageUrl} = thisOrg

  return (
    <div>
      <div className="orgId">{id}</div>
      <div className="orgName">{name}</div>
      <image src="imageUrl" />
    </div>
  )
}

export default SingleOrganization
