import React, {useState, useContext} from 'react'
import TaskCard from './TaskCard'
import AddTaskDialog from './AddTaskDialog'
import ColumnDropDown from './ColumnDropDown'
import TaskDropTargetWrapper from './TaskDropTargetWrapper'
import TaskProvider from '../context/taskContext'
import {ColumnContext} from '../context/columnContext'

import styles from './css/Column.css'

const Column = () => {
  // local state management for drop down column render
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  // useContext pull in all tasks from ProjectProvider
  const {column, setColumn, tasks, setTasks} = useContext(ColumnContext)

  const cancel = () => setIsDropDownActive(false)

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
            <TaskProvider key={task.id} taskId={task.id}>
              <TaskDropTargetWrapper taskId={task.id}>
                <TaskCard />
              </TaskDropTargetWrapper>
            </TaskProvider>
          ))}
          {/* <AddButton columnId={columnId} /> */}
        </div>
      </div>
    </div>
  )
}

export default Column
