import React, {useContext} from 'react'
import {AuthContext} from '../context/authContext'
import Board from './Board'

// import the top-level provider here
// and *not* the deconstructed context itself!
import ProjectProvider from './ProjectProvider'

// fetch relevant data to all subviews in this component
// provide userId from Routes component
const ProjectView = () => {
  const {user} = useContext(AuthContext)

  console.log('user is: ', user)

  return (
    <ProjectProvider userId={user.id}>
      {/* topLevelViewContainer should be used for all top-level view components */}
      <div className="topLevelViewContainer">
        <Board />
      </div>
    </ProjectProvider>
  )
}

export default ProjectView
