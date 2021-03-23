import {AuthForm, AllOrgs, ProjectView, Profile} from './components'

const frontendRoutes = [
  {
    path: '/',
    component: AuthForm,
  },
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
]

export default frontendRoutes
