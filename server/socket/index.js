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
  DRAG_START: 'drag-start',
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
  DRAG_WAS_STARTED: 'drag-was-started',
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on(received.MOVE_TASK, ({ignoreUser, projectId, newColumns}) => {
      console.log('received task move')
      io.emit(sent.TASK_WAS_MOVED, {ignoreUser, projectId, newColumns})
    })

    socket.on(received.ADD_COLUMN, ({ignoreUser, projectId}) => {
      console.log('received col add')
      io.emit(sent.COLUMN_WAS_ADDED, {ignoreUser, projectId})
    })

    socket.on(received.DELETE_COLUMN, ({ignoreUser, projectId, newColumns}) => {
      console.log('received col delete')
      io.emit(sent.COLUMN_WAS_DELETED, {
        ignoreUser,
        projectId,
        newColumns,
      })
    })

    socket.on(
      received.EDIT_COLUMN_NAME,
      ({ignoreUser, projectId, newColumns}) => {
        console.log('received col edit')
        io.emit(sent.COLUMN_NAME_WAS_EDITED, {
          ignoreUser,
          projectId,
          newColumns,
        })
      }
    )

    socket.on(received.ADD_TASK, ({ignoreUser, projectId, newColumns}) => {
      console.log('received task add')
      io.emit(sent.TASK_WAS_ADDED, {ignoreUser, projectId, newColumns})
    })

    socket.on(received.DELETE_TASK, ({ignoreUser, projectId, taskId}) => {
      console.log('received task delete')
      io.emit(sent.TASK_WAS_DELETED, {ignoreUser, projectId, taskId})
    })

    // only project board receives edit-task updates in real time
    // to avoid race condition of two users editing the same
    // card and one user's changes being preempted by sockets

    socket.on(received.EDIT_TASK, ({ignoreUser, projectId, updatedTask}) => {
      console.log('received task edit')
      io.emit(sent.TASK_WAS_EDITED, {ignoreUser, projectId, updatedTask})
    })

    // comments are received and processed in/by SingleTaskExpanded
    socket.on(received.ADD_COMMENT, ({ignoreUser, projectId, newComment}) => {
      console.log('received new comment')
      io.emit(sent.COMMENT_WAS_ADDED, {ignoreUser, projectId, newComment})
    })

    socket.on(received.DELETE_COMMENT, ({ignoreUser, projectId, commentId}) => {
      console.log('received delete comment')
      io.emit(sent.COMMENT_WAS_DELETED, {
        ignoreUser,
        projectId,
        commentId,
      })
    })

    socket.on(
      received.EDIT_COMMENT,
      ({ignoreUser, projectId, updatedComment}) => {
        console.log('received edited comment')
        io.emit(sent.COMMENT_WAS_EDITED, {
          ignoreUser,
          projectId,
          updatedComment,
        })
      }
    )
  })
}
