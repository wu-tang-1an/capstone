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
  DRAG_END: 'drag-end',
  EDIT_ORG: 'edit-org',
  DELETE_ORG: 'org-was-deleted',
  LEAVE_ORG: 'leave-org',
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
  DRAG_WAS_ENDED: 'drag-was-ended',
  ORG_WAS_EDITED: 'org-was-edited',
  ORG_WAS_DELETED: 'org-was-deleted',
  USER_LEFT_ORG: 'user-left-org',
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

    socket.on(received.DRAG_START, ({ignoreUser, projectId, dragId}) => {
      console.log('received start drag')
      io.emit(sent.DRAG_WAS_STARTED, {
        ignoreUser,
        projectId,
        dragId,
      })
    })

    socket.on(received.DRAG_END, ({ignoreUser, projectId, dragId}) => {
      console.log('received end drag')
      io.emit(sent.DRAG_WAS_ENDED, {
        ignoreUser,
        projectId,
        dragId,
      })
    })

    // if an org is edited or deleted, send to all project "rooms"
    // if user is currently working in the project, they'll
    // be notified and sent back to their home view
    socket.on(received.EDIT_ORG, ({ignoreUser, projectIdArray}) => {
      console.log('received edited org')
      io.emit(sent.ORG_WAS_EDITED, {
        ignoreUser,
        projectIdArray,
      })
    })

    socket.on(received.DELETE_ORG, ({ignoreUser, projectIdArray}) => {
      console.log('received deleted org')
      io.emit(sent.ORG_WAS_DELETED, {
        ignoreUser,
        projectIdArray,
      })
    })

    socket.on(received.LEAVE_ORG, ({ignoreUser}) => {
      console.log('received user left org')
      io.emit(sent.USER_LEFT_ORG, {
        ignoreUser,
      })
    })
  })
}
