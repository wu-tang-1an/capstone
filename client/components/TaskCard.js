import React, {useState} from 'react'
import TaskCardDropDown from './TaskCardDropDown'

const onDragStart = (e, task) => {
  console.log('dragging task: ', task)
  e.dataTransfer.setData('text/plain', JSON.stringify(task))
}

import styles from './TaskCard.css'
const TaskCard = (props) => {
  const [isActive, setActive] = useState(false)

  const {id, name, createdBy, createdAt, description, status, user} = props.task

  return (
    <div draggable={true} onDragStart={(e) => onDragStart(e, props.task)}>
      {isActive && <TaskCardDropDown taskId={id} />}
      <div className={styles.taskCardContainer}>
        <div className="material-icons">error_outline</div>
        <div className={styles.titleAndCreator}>
          <div className={styles.title}>{name}</div>
          <div
            className={styles.idAndCreatedBy}
          >{`#${id} opened by ${user.name}`}</div>
        </div>
        <div className={styles.dotMenuAndAvatar}>
          <span className="material-icons" onClick={() => setActive(!isActive)}>
            more_horiz
          </span>
          <img src={user.imageUrl} />
        </div>
      </div>
    </div>
  )
}

export default TaskCard
