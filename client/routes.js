import React, {useContext} from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  AuthForm,
  ProjectView,
  SingleOrganization,
  LandingPage,
  Signup,
  Profile,
  Home,
  Loading,
  NewUpdateUser,
  Organization,
} from './components'

import {AuthContext} from './context/authContext'

const Routes = () => {
  const {user} = useContext(AuthContext)

  return (
    <div>
      {/* loading page while user is undefined */}
      {!user && <Loading />}

      {/* these routes are available before login */}
      {user && !user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" render={(props) => <Signup {...props} />} />
          <Route path="/login" render={() => <AuthForm authType="login" />} />
          <Route path="/signup" render={() => <AuthForm authType="signup" />} />
        </Switch>
      )}

      {/* these routes are available after login */}
      {user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/organizations" component={Organization} />
          <Route
            path="/organizations/:organizationId"
            component={SingleOrganization}
          />
          <Route path="/projects/:projectId" component={ProjectView} />
          <Route path="/profile" component={Profile} />
          <Route path="/updateProfile" component={NewUpdateUser} />
        </Switch>
      )}
    </div>
  )
}

export default Routes
