import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import TaskCardDropDown from './TaskCardDropDown'
import {ItemTypes} from './DragConstants'
import {useDrag} from 'react-dnd'

import styles from './TaskCard.css'
const TaskCard = (props) => {
  const [isActive, setActive] = useState(false)

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.TASKCARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const {id, name, createdBy, createdAt, description, status, user} = props.task

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {isActive && <TaskCardDropDown taskId={id} />}
      <div className={styles.taskCardContainer}>
        <div className="material-icons">error_outline</div>
        <div className={styles.titleAndCreator}>
          <div className={styles.title}>{name}</div>
          <div
            className={styles.idAndCreatedBy}
          >{`# opened by ${user.name}`}</div>
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
