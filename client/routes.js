import React, {useContext} from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  AuthForm,
  ProjectView,
  SingleOrganization,
  AllOrgs,
  Profile,
} from './components'

import {AuthContext} from './context/authContext'

const Routes = () => {
  const {user} = useContext(AuthContext)

  return (
    <div>
      {/* these routes are available before login */}
      {user && !user.id && (
        <Switch>
          <Route path="/login" render={() => <AuthForm authType="login" />} />
          <Route path="/signup" render={() => <AuthForm authType="signup" />} />
          <Route path="*" component={AuthForm} />
        </Switch>
      )}

      {/* these routes are available after login */}
      {user.id && (
        <Switch>
          <Route exact path="/organizations" component={AllOrgs} />
          <Route
            path="/organizations/:organizationId"
            component={SingleOrganization}
          />
          <Route path="/projects/:projectId" component={ProjectView} />
          <Route path="/profiles/users/:userId" component={Profile} />
        </Switch>
      )}
    </div>
  )
}

export default Routes
