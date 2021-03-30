const received = {
  MOVE_TASK: 'move-task',
  ADD_COLUMN: 'add-column',
  DELETE_COLUMN: 'delete-column',
  EDIT_COLUMN_NAME: 'edit-column-name',
  ADD_TASK: 'add-task',
  DELETE_TASK: 'delete-task',
  EDIT_TASK: 'edit-task',
  ADD_COMMENT: 'add-comment',
  DELETE_COMMENT: 'delete-comment',
  EDIT_COMMENT: 'edit-comment',
}

const sent = {
  TASK_WAS_MOVED: 'task-was-moved',
  COLUMN_WAS_ADDED: 'column-was-added',
  COLUMN_WAS_DELETED: 'column-was-deleted',
  COLUMN_NAME_WAS_EDITED: 'column-name-was-edited',
  TASK_WAS_ADDED: 'task-was-added',
  TASK_WAS_DELETED: 'task-was-deleted',
  TASK_WAS_EDITED: 'task-was-edited',
  COMMENT_WAS_ADDED: 'comment-was-added',
  COMMENT_WAS_DELETED: 'comment-was-deleted',
  COMMENT_WAS_EDITED: 'comment-was-edited',
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on(received.MOVE_TASK, ({ignore, newColumns}) => {
      console.log('received task move')
      io.emit(sent.TASK_WAS_MOVED, {ignore, newColumns})
    })

    socket.on(received.ADD_COLUMN, ({ignore}) => {
      console.log('received col add')
      io.emit(sent.COLUMN_WAS_ADDED, {ignore})
    })

    socket.on(received.DELETE_COLUMN, ({ignore, newColumns}) => {
      console.log('received col delete')
      io.emit(sent.COLUMN_WAS_DELETED, {ignore, newColumns})
    })

    socket.on(received.EDIT_COLUMN_NAME, ({ignore, newColumns}) => {
      console.log('received col edit')
      io.emit(sent.COLUMN_NAME_WAS_EDITED, {ignore, newColumns})
    })

    socket.on(received.ADD_TASK, ({ignore, newColumns}) => {
      console.log('received task add')
      io.emit(sent.TASK_WAS_ADDED, {ignore, newColumns})
    })

    socket.on(received.DELETE_TASK, ({ignore, taskId}) => {
      console.log('received task delete')
      io.emit(sent.TASK_WAS_DELETED, {ignore, taskId})
    })

    // only project board receives edit-task updates in real time
    // to avoid race condition of two users editing the same
    // card and one user's changes being preempted by sockets

    socket.on(received.EDIT_TASK, ({ignore, updatedTask}) => {
      console.log('received task edit')
      io.emit(sent.TASK_WAS_EDITED, {ignore, updatedTask})
    })

    // comments are received and processed in/by SingleTaskExpanded
    socket.on(received.ADD_COMMENT, ({ignore, newComment}) => {
      console.log('received new comment')
      io.emit(sent.COMMENT_WAS_ADDED, {ignore, newComment})
    })

    socket.on(received.DELETE_COMMENT, ({ignore, commentId}) => {
      console.log('received delete comment')
      io.emit(sent.COMMENT_WAS_DELETED, {ignore, commentId})
    })

    socket.on(received.EDIT_COMMENT, ({ignore, updatedComment}) => {
      console.log('received edited comment')
      io.emit(sent.COMMENT_WAS_EDITED, {ignore, updatedComment})
    })
  })
}
