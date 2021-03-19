import React, {Fragment, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import TaskCardDropDown from './TaskCardDropDown'
import {useDrag, useDrop} from 'react-dnd'
import styles from './TaskCard.css'

const TaskCard = (props) => {
  const {
    id,
    name,
    index,
    createdBy,
    createdAt,
    description,
    moveItem,
    status,
    user,
  } = props.task

  return (
    <Fragment>
      <div className={styles.taskCardContainer}>
        <div className="material-icons">error_outline</div>
        <div className={styles.titleAndCreator}>
          <Link to={`/tasks/${id}`}>
            <div className={styles.title}>{name}</div>
          </Link>
          <div className={styles.idAndCreatedBy}>
            {`#${id} opened by ${user.name}`}
          </div>
        </div>

        <div className={styles.dotMenuAndAvatar}>
          <span className="material-icons">more_horiz</span>
          {<TaskCardDropDown taskId={id} />}
          <img src={user.imageUrl} />
        </div>
      </div>
    </Fragment>
  )
}

export default TaskCard
