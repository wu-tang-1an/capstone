module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('move-task', ({ignore, newColumns}) => {
      console.log('received task move')
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

    socket.on('add-task', ({ignore}) => {
      console.log('received task add')
      io.emit('task-was-added', {ignore})
    })

    socket.on('delete-task', ({ignore}) => {
      console.log('received task delete')
      io.emit('task-was-deleted', {ignore})
    })

    socket.on('edit-task', ({ignore, updatedTask}) => {
      console.log('received task edit')
      io.emit('task-was-edited', {ignore, updatedTask})
    })

    // comments ???
    /*

    socket.on('add-comment', ({ignore}) => {
      console.log('received comment add')
      io.emit('comment-was-added', {ignore})
    })

    socket.on('edit-comment', ({ignore}) => {
      console.log('received comment edit')
      io.emit('comment-was-edited', {ignore})
    })
    */
  })
}
