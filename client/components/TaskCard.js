import React, {useState, useContext} from 'react'
import TaskCardDropDown from './TaskCardDropDown'
import {ProjectContext} from '../context/projectContext'

const onDragStart = (e, task) => {
  console.log('dragging task: ', task)
  e.dataTransfer.setData('text/plain', JSON.stringify(task))
}

import styles from './css/TaskCard.css'

const TaskCard = ({task}) => {
  // local state management for drop down render
  const [isDropDownActive, setDropDownActive] = useState(false)

  // deconstruct task data
  const {id, createdBy, createdAt, status, user} = task || {}

  return (
    <div draggable={true} onDragStart={(e) => onDragStart(e, task)}>
      {isDropDownActive && <TaskCardDropDown taskId={id} />}
      <div className={styles.taskCardContainer}>
        <div className="material-icons">error_outline</div>
        <div className={styles.titleAndCreator}>
          <div className={styles.title}>{task.description}</div>
          <div
            className={styles.idAndCreatedBy}
            /* join user here to access user data: name, imageUrl */
          >{`#${id} opened by ${'USER_NAME_HERE'}`}</div>
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
