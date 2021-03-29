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

    // only project board receives edit-task updates in real time
    // to avoid race condition of two users editing the same
    // card and one user's changes being preempted by sockets

    socket.on('edit-task', ({ignore, updatedTask}) => {
      console.log('received task edit')
      io.emit('task-was-edited', {ignore, updatedTask})
    })

    // comments are received and processed in/by SingleTaskExpanded
    socket.on('add-comment', ({ignore, newComment}) => {
      console.log('received new comment')
      io.emit('comment-was-added', {ignore, newComment})
    })

    socket.on('delete-comment', ({ignore, commentId}) => {
      console.log('received delete comment')
      io.emit('comment-was-deleted', {ignore, commentId})
    })

    socket.on('edit-comment', ({ignore, updatedComment}) => {
      console.log('received edited comment')
      io.emit('comment-was-edited', {ignore, updatedComment})
    })
  })
}
