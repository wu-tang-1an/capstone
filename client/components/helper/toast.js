import {toast} from 'react-toastify'

// helper sends a toast notification
export function notify(text = 'I am a notification!', type) {
  switch (type) {
    case 'info':
      toast.info(text, {
        position: 'bottom-right',
      })
      break

    case 'success':
      toast.success(text, {
        position: 'bottom-right',
      })
      break

    case 'warning':
      toast.warn(text, {
        position: 'bottom-right',
      })
      break

    case 'error':
      toast.error(text, {
        position: 'bottom-right',
      })
      break

    case 'dark':
      toast.dark(text, {
        position: 'bottom-right',
      })
      break

    default:
      toast(text, {
        position: 'bottom-right',
      })
      break
  }
}
