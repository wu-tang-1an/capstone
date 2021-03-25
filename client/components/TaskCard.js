import React, {useState, useContext} from 'react'
import TaskCardDropDown from './TaskCardDropDown'
import {AuthContext} from '../context/authContext'
import styles from './css/TaskCard.css'

const TaskCard = ({task}) => {
  // local state management for drop down render
  const [isDropDownActive, setDropDownActive] = useState(false)

  // get user from auth context
  const {user} = useContext(AuthContext)

  const {id, description} = task

  // returns firstName + lastName for task card "opened by _____"
  const getFullName = () =>
    `${task.users[0].firstName} ${task.users[0].lastName}`

  return (
    <div>
      {isDropDownActive && (
        <TaskCardDropDown
          task={task}
          closeDropDown={() => setDropDownActive(false)}
        />
      )}
      <div className={styles.taskCardContainer}>
        <div className="material-icons">error_outline</div>
        <div className={styles.titleAndCreator}>
          <div className={styles.title}>{description}</div>
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
  )
}

export default TaskCard
