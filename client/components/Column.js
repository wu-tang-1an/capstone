import React, {useState} from 'react'
import TaskCard from './TaskCard'
import AddTaskDialog from './AddTaskDialog'
import ColumnDropDown from './ColumnDropDown'
import styles from './css/Column.css'

const Column = ({column}) => {
  // local state management for drop down column render
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  // close drop down method
  const cancel = () => setIsDropDownActive(false)

  // grab column data
  const {tasks} = column

  return (
    <div>
      {isDropDownActive && (
        <ColumnDropDown columnId={column.id} cancel={cancel} />
      )}
      <div className={styles.columnContainer}>
        <div className={styles.badgeTitleDotMenu}>
          <div className={styles.badgeAndTitle}>
            <div className={styles.columnBadge}> {tasks.length} </div>
            <div className={styles.columnTitle}> {column.name} </div>
          </div>
          <div className={styles.newTaskAndMoreOpts}>
            <div
              className="material-icons"
              onClick={() => setIsAddTaskVisible(!isAddTaskVisible)}
            >
              {' '}
              add{' '}
            </div>
            <div
              className="material-icons"
              onClick={() => setIsDropDownActive(!isDropDownActive)}
            >
              more_horiz
            </div>
          </div>
        </div>
        <div className={styles.cardContainer}>
          {isAddTaskVisible && (
            <AddTaskDialog cancel={() => setIsAddTaskVisible(false)} />
          )}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Column
