module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('move-task', ({ignore, newColumns}) => {
      console.log('project board has been updated!')
      io.emit('task-was-moved', {ignore, newColumns})
    })

    socket.on('add-column', ({ignore}) => {
      console.log('received col add')
      io.emit('column-was-added', {ignore})
    })

    socket.on('delete-column', ({ignore}) => {
      console.log('received col delete')
      io.emit('column-was-deleted', {ignore})
    })

    socket.on('edit-column-name', ({ignore}) => {
      console.log('received col edit')
      io.emit('column-name-was-edited', {ignore})
    })
  })
}
