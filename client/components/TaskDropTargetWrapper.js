import React, {useState} from 'react'
import styles from './css/TaskDropTargetWrapper.css'

const TaskDropTargetWrapper = ({children, columnId, updateTask}) => {
  const [isMouseOverLowerHalf, setMouseOverLowerHalf] = useState(false)

  const [isMouseOverUpperHalf, setMouseOverUpperHalf] = useState(false)

  const getMousePosition = (e) => {
    const rect = e.target.getBoundingClientRect()
    const y = e.clientY - rect.top
    return y
  }

  const setMousePosition = (isOverUpperHalf) => {
    if (isOverUpperHalf === '') return
    if (isOverUpperHalf) {
      console.log('mouse over top half!')
      setMouseOverLowerHalf(false)
      setMouseOverUpperHalf(true)
      return
    }
    console.log('mouse over bottom half!')
    setMouseOverUpperHalf(false)
    setMouseOverLowerHalf(true)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    const targetHeight = e.target.clientHeight
    const isOverUpperHalf = getMousePosition(e) / targetHeight < 0.5
    const isOverLowerHalf = getMousePosition(e) / targetHeight >= 0.5
    isOverUpperHalf && !isMouseOverUpperHalf
      ? setMousePosition(true)
      : isOverLowerHalf && !isMouseOverLowerHalf
      ? setMousePosition(false)
      : setMousePosition('')
  }

  const onDrop = (e, columnId) => {
    // parse task from data transfer
    const task = JSON.parse(e.dataTransfer.getData('text/plain'))

    console.log(task)

    // write new columnId to updateInfo
    const updateInfo = {
      ...task,
      columnId,
    }

    // clear mouseover info
    // pass taskId and updated task
    setMouseOverLowerHalf(false)
    setMouseOverUpperHalf(false)
    updateTask(task.id, updateInfo)
  }

  return (
    <div onDrop={(e) => onDrop(e, columnId)}>
      {isMouseOverUpperHalf && (
        <div className={styles.dropTargetContainer}></div>
      )}
      <div
        className={styles.taskCardContainer}
        onDragOver={onDragOver}
        // onDrop={(e) => onDrop(e, columnId)}
      >
        {children}
      </div>
      {isMouseOverLowerHalf && (
        <div className={styles.dropTargetContainer}></div>
      )}
    </div>
  )
}

export default TaskDropTargetWrapper
