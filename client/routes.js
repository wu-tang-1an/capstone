import React, {useContext} from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  Login,
  ProjectView,
  SingleOrganization,
  LandingPage,
  Signup,
  Profile,
  Home,
  Loading,
  AllOrgs,
} from './components'

import {AuthContext} from './context/authContext'

const Routes = () => {
  const {user} = useContext(AuthContext)

  return (
    <>
      {/* loading page while user is undefined */}
      {!user && <Loading />}

      {/* these routes are available before login */}
      {user && !user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={Login} />
        </Switch>
      )}

      {/* these routes are available after login */}
      {user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/organizations" component={AllOrgs} />
          <Route
            path="/organizations/:organizationId"
            component={SingleOrganization}
          />
          <Route path="/projects/:projectId" component={ProjectView} />
          <Route exact path="/profile" component={Profile} />
          <Route component={Home} />
        </Switch>
      )}
    </>
  )
}

export default Routes
