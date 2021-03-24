import React, {useState, useContext} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import TaskCardDropDown from './TaskCardDropDown'
import {TaskContext} from '../context/taskContext'
import styles from './css/TaskCard.css'

const Container = styled.div`
  border-radius: 2px;
  padding: 1px;
  margin-bottom: 8px;
`

const TaskCard = (props) => {
  // local state management for drop down render
  const [isDropDownActive, setDropDownActive] = useState(false)

  // get task and user
  // type-checking necessary to avoid render issues
  const {task} = useContext(TaskContext)
  const {id} = task
  const users = task.users || []
  const user = (users && users[0]) || {}

  // returns firstName + lastName for task card "opened by _____"
  const getFullName = () => `${user.firstName} ${user.lastName}`

  return (
    <Draggable draggableId={String(props.taskId)} index={props.index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            {isDropDownActive && <TaskCardDropDown taskId={id} />}
            <div className={styles.taskCardContainer}>
              <div className="material-icons">error_outline</div>
              <div className={styles.titleAndCreator}>
                <div className={styles.title}>{task.description}</div>
                <div
                  className={styles.idAndCreatedBy}
                >{`#${id} opened by ${getFullName()}`}</div>
              </div>
              <div className={styles.dotMenuAndAvatar}>
                <span
                  className="material-icons"
                  onClick={() => setDropDownActive(!isDropDownActive)}
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
