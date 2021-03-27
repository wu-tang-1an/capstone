import React, {useContext, useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import TaskCardDropDown from './TaskCardDropDown'
import {AuthContext} from '../context/authContext'
import {ColumnContext} from '../context/columnContext'
import {TaskContext} from '../context/taskContext'
import {ProjectContext} from '../context/projectContext'
import {updateTaskDB, getColumnsDB} from '../context/axiosService'
import ImportantBadge from './ImportantBadge'
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
  const {id, name} = task
  const {users} = task || []

  // initilaize local state to track task card badge activation
  const [isActiveBadge, setActiveBadge] = useState(task.isActiveBadge)

  // grab setColumns method to update columns on project context
  const {columns, setColumns, project} = useContext(ProjectContext)

  // returns firstName + lastName for task card "opened by _____"
  const getFullName = () => {
    if (!users || (users && !users.length)) return ''
    return `${users[0].firstName} ${users[0].lastName}`
  }

  const activateTaskBadge = async () => {
    const updatedTask = updateTaskDB({isActiveBadge: !isActiveBadge}, task.id)

    // important! we set columns on project context
    // so that local task state persists across
    // drag and drop -- to do that, we need to
    // first store the current column ORDER
    // and rearrange our fetched columns from the db
    const currentColumnOrder = columns.map((col) => col.id)

    const fetchedColumns = await getColumnsDB(project.id)

    const updatedColumns = currentColumnOrder.map((orderedId) =>
      fetchedColumns.find((col) => col.id === orderedId)
    )

    setColumns(updatedColumns)

    // then, toggle active badge
    setActiveBadge(!isActiveBadge)
  }

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
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
                  ? styles.taskCardContainerActive
                  : styles.taskCardContainer
              }
            >
              <span onClick={() => activateTaskBadge()}>
                <ImportantBadge isActiveBadge={isActiveBadge} />
              </span>
              <div className={styles.titleAndCreator}>
                <div className={styles.title}>{name}</div>
                <div className={styles.idAndCreatedBy}>
                  {`#${id} opened by ${getFullName()}`}
                </div>
              </div>
              <div className={styles.dotMenuAndAvatar}>
                <span
                  className="material-icons"
                  onClick={() => {
                    setDropDownTargetId(task.id)
                    setTaskDropDownVisible(!isTaskDropDownVisible)
                  }}
                >
                  more_horiz
                </span>
                <img src={user.imageUrl} />
              </div>
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  )
}

export default TaskCard
