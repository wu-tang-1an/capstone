import {AuthForm, AllOrgs, ProjectView, Profile} from './components'

const frontendRoutes = [
  {
    path: `/organizations`,
    component: AllOrgs,
  },
  {
    path: '/organizations/:projectId',
    component: ProjectView,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/',
    component: AuthForm,
  },
]

export default frontendRoutes
