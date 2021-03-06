import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export const socketSent = {
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
  SEND_INVITE: 'send-invite',
  ACCEPT_INVITE: 'accept-invite',
  REMOVE_USER: 'remove-user',
  EDIT_PROJECT: 'edit-project',
  DELETE_PROJECT: 'delete-project',
  ADD_PROJECT: 'add-project',
}

export const socketReceived = {
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
  INVITE_WAS_SENT: 'invite-was-sent',
  INVITE_WAS_ACCEPTED: 'invite-was-accepted',
  USER_WAS_REMOVED: 'user-was-removed',
  PROJECT_WAS_EDITED: 'project-was-edited',
  PROJECT_WAS_DELETED: 'project-was-deleted',
  PROJECT_WAS_ADDED: 'project-was-added',
}

export default socket
