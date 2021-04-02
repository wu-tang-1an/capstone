import {notify} from './toast'
import history from '../../history'

export function errorRedirect(route = '/home') {
  notify('Something went wrong!', 'error')
  history.push(route)
}
