import React, {useState, useContext} from 'react'
import TaskCardDropDown from './TaskCardDropDown'
import {TaskContext} from '../context/taskContext'
import styles from './css/TaskCard.css'

const TaskCard = () => {
  // local state management for drop down render
  const [isDropDownActive, setDropDownActive] = useState(false)

  // get task and user
  const {task} = useContext(TaskContext)
  const {id, description} = task
  const users = task.users || []
  const user = (users && users[0]) || {}

  const getFullName = () => `${user.firstName} ${user.lastName}`

  return (
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
          {/* join user here to access user data: name, imageUrl */}
          <img src="USER_IMAGE_HERE" />
        </div>
      </div>
    </div>
  )
}

export default TaskCard
