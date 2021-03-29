module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('update', ({ignore, newColumns}) => {
      console.log('project board has been updated!')
      io.emit('task-dnd', {ignore, newColumns})
    })
  })
}
