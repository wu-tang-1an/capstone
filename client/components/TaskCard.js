import React, {useContext, useState, useEffect} from 'react'
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
import socket from '../socket'
import styles from './css/TaskCard.css'

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
  } = useContext(TaskContext)

  // get user from auth context, unpack task, and get task's users
  const {user} = useContext(AuthContext)
  const {id, name, createdAt} = task
  const {users} = task || []

  // initilaize local state to track task card badge activation
  const [isActiveBadge, setActiveBadge] = useState(task.isActiveBadge)

  // grab helper to refresh data on project board after changes
  const {refreshProjectBoard, taskChanged, setTaskChanged} = useContext(
    ProjectContext
  )

  // returns firstName + lastName for task card "opened by _____"
  const getFullName = () => {
    if (!users || (users && !users.length)) return ''
    return `${users[0].firstName} ${users[0].lastName}`
  }

  const activateTaskBadge = async () => {
    // PUT the new active badge status in db
    const updatedTask = await updateTaskDB(
      {isActiveBadge: !isActiveBadge},
      task.id
    )

    // then, toggle active badge
    setActiveBadge(!isActiveBadge)

    socket.emit('edit-task', {ignore: socket.id, updatedTask})

    // helper refreshes project board data
    await refreshProjectBoard()
  }

  // receives project board-level updates on name, badge-status
  // and number of comments
  useEffect(() => {
    let isMounted = true
    socket.on('task-was-edited', ({ignore, updatedTask}) => {
      if (socket.id === ignore) return
      setTaskChanged(!taskChanged)
    })
    return () => {
      isMounted = false
    }
  })

  return (
    <Draggable draggableId={String(task.id)} index={index}>
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
                    {`opened by ${getFullName()} on ${moment(createdAt).format(
                      'l'
                    )}`}
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.commentsBadgeAndAvatars}>
              <NumberOfCommentsBadge
                numberOfComments={
                  task && task.comments ? task.comments.length : 0
                }
              />
              <img src={user.imageUrl} />
            </section>
          </div>
        </Container>
      )}
    </Draggable>
  )
}

export default TaskCard
