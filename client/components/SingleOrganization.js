import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'

const SingleOrganization = ({match}) => {
  const {user, setUser} = useContext(AuthContext)

  // get orgId from route props
  const orgId = +match.params.organizationId

  // get thisOrg from orgs joined on user instance
  const thisOrg = user.organizations.find((org) => org.id === orgId)

  // get projects from thisOrg
  const projects = thisOrg.projects

  return (
    <div>
      Projects:
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <img src={project.imageUrl} />
          <div>{project.name}</div>
          <div>{project.status}</div>
          <div>{project.description}</div>
        </Link>
      ))}
    </div>
  )
}

export default SingleOrganization
