import React, {Fragment, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import TaskCardDropDown from './TaskCardDropDown'
import {useDrag, useDrop} from 'react-dnd'
import Window from './Window'
import styles from './TaskCard.css'

const TASK_TYPE = 'TASK'

const TaskCard = (props) => {
  const task = props.task
  console.log('task--->', task)
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

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: TASK_TYPE,
    hover(task, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = task.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoveredRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
      const mousePosition = monitor.getClientOffset()
      const hoverClientY = mousePosition.y - hoveredRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveItem(dragIndex, hoverIndex)
      task.index = hoverIndex
    },
  })

  const [{isDragging}, drag] = useDrag({
    item: {type: TASK_TYPE, ...task, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [show, setShow] = useState(false)

  const onOpen = () => setShow(true)

  const onClose = () => setShow(false)

  drag(drop(ref))

  return (
    <Fragment className={styles.taskCardContainer}>
      <div
        ref={ref}
        style={{opacity: isDragging ? 0 : 1}}
        className="task"
        onClick={onOpen}
      >
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

      <Window task={task} onClose={onClose} />
    </Fragment>
  )
}

export default TaskCard
