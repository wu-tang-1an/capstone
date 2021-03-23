import React, {useState} from 'react'
import styles from './css/TaskDropTargetWrapper.css'

const TaskDropTargetWrapper = ({children, columnId, updateTask}) => {
  // initialize state to check mouse position relative to drop zone
  const [isMouseOverLowerHalf, setMouseOverLowerHalf] = useState(false)
  const [isMouseOverUpperHalf, setMouseOverUpperHalf] = useState(false)

  // calculate y-axis mouse position
  const getMousePosition = (e) => {
    const rect = e.target.getBoundingClientRect()
    const y = e.clientY - rect.top
    return y
  }

  // set state according to y-axis mouse position
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

  // set mouse position on drag over event
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

  // put database order
  const onDrop = (e) => {
    // parse task from data transfer
    const task = JSON.parse(e.dataTransfer.getData('text/plain'))

    console.log(task)

    // write new columnId to updateInfo
    const updateInfo = {
      ...task,
      columnId, // available on props
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
