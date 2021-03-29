import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('refresh-project-board', ({ignore}) => {
  console.log('view updated! ignore: ', ignore)
})

export default socket
