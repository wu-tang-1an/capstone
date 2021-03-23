import React, {useContext} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  AuthForm,
  ProjectView,
  SingleTaskExpanded,
  SingleOrganization,
  AllOrgs,
  Profile,
} from './components'

import {AuthContext} from './context/authContext'
import routesArray from './routes-array'

const Routes = () => {
  const {user} = useContext(AuthContext)

  return (
    <div>
      {user && !user.id ? (
        <Switch>
          <Route path="/login" render={() => <AuthForm authType="login" />} />
          <Route path="/signup" render={() => <AuthForm authType="signup" />} />
          <Route path="*" component={AuthForm} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/organizations" component={AllOrgs} />
          <Route
            path="/organizations/:organizationId"
            component={SingleOrganization}
          />
          <Route
            path="/organization/:organizationId/projects/:projectId"
            component={ProjectView}
          />
          <Route path="/profiles/users/:userId" component={Profile} />
        </Switch>
      )}
    </div>
  )
}

export default Routes

// class Routes extends Component {
//   componentDidMount() {
//     this.props.loadInitialData()
//   }

//   render() {
//     const {isLoggedIn} = this.props

//     return (
//       <Switch>
//         {/* Routes placed here are available to all visitors */}
//         <Route path="/login" component={Login} />
//         <Route path="/signup" component={Signup} />
//         {/* temp -- ProjectView will only be visible after login */}
//         <Route
//           path="/home"
//           render={() => <ProjectView userId={this.props.singleUser.id} />}
//         />
//         <Route path="/tasks/:taskId" component={SingleTaskExpanded} />
//         {isLoggedIn && (
//           <Switch>
//             {/* Routes placed here are only available after logging in */}
//             <Route
//               path="/home"
//               render={() => <ProjectView userId={this.props.singleUser.id} />}
//             />
//             <Route exact path="/organizations" component={AllOrgs} />
//             <Route exact path="/profile" component={Profile} />
//           </Switch>
//         )}
//         {/* Displays our Login component as a fallback */}
//         <Route component={Login} />
//       </Switch>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     singleUser: state.singleUser,
//     isLoggedIn: !!state.singleUser.id,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     },
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// }
