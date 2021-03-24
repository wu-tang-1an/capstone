import React, {useState, useContext} from 'react'
import TaskCardDropDown from './TaskCardDropDown'
import {TaskContext} from '../context/taskContext'
import styles from './css/TaskCard.css'
import {Draggable} from 'react-beautiful-dnd'

const TaskCard = ({id, index}) => {
  // local state management for drop down render
  const [isDropDownActive, setDropDownActive] = useState(false)

  // get task and user
  // type-checking necessary to avoid render issues
  const {task} = useContext(TaskContext)
  // const {id} = task
  const users = task.users || []
  const user = (users && users[0]) || {}

  // returns firstName + lastName for task card "opened by _____"
  const getFullName = () => `${user.firstName} ${user.lastName}`

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
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
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard
