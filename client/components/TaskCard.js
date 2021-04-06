import React, {useContext, useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import moment from 'moment'
import TaskCardDropDown from './TaskCardDropDown'
import {AuthContext} from '../context/authContext'
import {ColumnContext} from '../context/columnContext'
import {TaskContext} from '../context/taskContext'
import {ProjectContext} from '../context/projectContext'
import {updateTaskDB} from '../context/axiosService'
import ImportantBadge from './ImportantBadge'
import NumberOfCommentsBadge from './NumberOfCommentsBadge'
import socket, {socketSent, socketReceived} from '../socket'
import styles from './css/TaskCard.module.css'

const Container = styled.div`
  border-radius: 1px;
  padding: 1px;
  margin-bottom: 1px;
`

const TaskCard = ({task, index}) => {
  // local state management for drop down render
  const {activeTask, setActiveTask} = useContext(ColumnContext)

  // local state management for selecting a particular dropdown
  // important! this prevents opening EVERY dropdown dialog
  // for all tasks in a column
  const {
    dropDownTargetId,
    setDropDownTargetId,
    isTaskDropDownVisible,
    setTaskDropDownVisible,
    dragDisabled,
    setDragDisabled,
  } = useContext(TaskContext)

  // get user from auth context, unpack task, and get task's users
  const {user} = useContext(AuthContext)
  const {id, name, createdAt, createdBy} = task
  const {users} = task || []

  // initilaize local state to track task card badge activation
  const [isActiveBadge, setActiveBadge] = useState(task.isActiveBadge)
  const [comments, setComments] = useState(task.comments || [])

  // grab helper to refresh data on project board after changes
  const {
    project,
    refreshProjectBoard,
    taskChanged,
    setTaskChanged,
  } = useContext(ProjectContext)

  const activateTaskBadge = async () => {
    // PUT the new active badge status in db
    const updatedTask = await updateTaskDB(
      {isActiveBadge: !isActiveBadge},
      task.id
    )

    // then, toggle active badge and update local state
    setActiveBadge(!isActiveBadge)
    setTaskChanged(!taskChanged)

    // // helper refreshes project board data
    // await refreshProjectBoard()
    socket.emit(socketSent.EDIT_TASK, {
      ignoreUser: socket.id,
      projectId: project.id,
      updatedTask,
    })
  }

  // socket logic for drag start
  socket.on(
    socketReceived.DRAG_WAS_STARTED,
    ({ignoreUser, projectId, dragId}) => {
      if (socket.id === ignoreUser || projectId !== project.id) return
      if (dragId === task.id) setDragDisabled(true)
    }
  )

  // socket logic for drag end
  socket.on(
    socketReceived.DRAG_WAS_ENDED,
    ({ignoreUser, projectId, dragId}) => {
      if (socket.id === ignoreUser || projectId !== project.id) return
      if (dragId === task.id) setDragDisabled(false)
    }
  )

  // socket logic for task updates
  socket.on(
    socketReceived.TASK_WAS_EDITED,
    ({ignoreUser, projectId, updatedTask}) => {
      if (socket.id === ignoreUser || projectId !== project.id) return
      if (task.id === updatedTask.id) {
        setActiveBadge(updatedTask.isActiveBadge)
        setTaskChanged(!taskChanged)
      }
    }
  )

  // important! if "this" client makes a CRUD op
  // with a comment, we want to listen for it even though
  // "we" emitted the event! due to the way our modal
  // is hooked above the task card state, we actually
  // need to "listen" for comment events here
  // so we check task id, rather than check socket id
  socket.on(socketReceived.COMMENT_WAS_ADDED, ({newComment}) => {
    if (task.id === newComment.taskId) {
      setComments([...comments, newComment])
      setTaskChanged(!taskChanged)
    }
  })

  socket.on(socketReceived.COMMENT_WAS_DELETED, ({commentId}) => {
    if (task.comments.some((comment) => comment.id === commentId)) {
      setComments(comments.filter((comment) => comment.id !== commentId))
      setTaskChanged(!taskChanged)
    }
  })

  socket.on(socketReceived.COMMENT_WAS_EDITED, ({updatedComment}) => {
    if (task.comments.some((comment) => comment.id === updatedComment.id)) {
      setComments(
        comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        )
      )
      setTaskChanged(!taskChanged)
    }
  })

  return (
    <Draggable
      draggableId={String(task.id)}
      isDragDisabled={dragDisabled}
      index={index}
    >
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isTaskDropDownVisible && (
            <TaskCardDropDown
              task={task}
              closeDropDown={() =>
                setTaskDropDownVisible(!isTaskDropDownVisible)
              }
            />
          )}
          <div
            className={
              isActiveBadge
                ? styles.innerContainerActive
                : styles.innerContainer
            }
          >
            <section>
              <div className={styles.dotMenu}>
                <i
                  className="material-icons"
                  onClick={() => {
                    setDropDownTargetId(task.id)
                    setTaskDropDownVisible(!isTaskDropDownVisible)
                  }}
                >
                  more_horiz
                </i>
              </div>
              <div className={styles.taskCardContainer}>
                <span onClick={() => activateTaskBadge()}>
                  <ImportantBadge isActiveBadge={isActiveBadge} />
                </span>
                <div className={styles.titleAndCreator}>
                  <div className={styles.title}>
                    <span>{`#${id}`}</span>
                    <span>{name}</span>
                  </div>
                  <div className={styles.idAndCreatedBy}>
                    {`opened by ${createdBy} on ${moment(createdAt).format(
                      'l'
                    )}`}
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.commentsBadgeAndAvatars}>
              <NumberOfCommentsBadge
                numberOfComments={comments ? comments.length : 0}
              />
              {users.length ? (
                <img src={users[0].imageUrl} />
              ) : (
                <span style={{opacity: '.6', fontSize: '12px'}}>
                  unassigned
                </span>
              )}
            </section>
          </div>
        </Container>
      )}
    </Draggable>
  )
}

export default TaskCard
