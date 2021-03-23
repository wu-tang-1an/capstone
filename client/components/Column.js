import React, {useState, useContext} from 'react'
import TaskCard from './TaskCard'
import ColumnDropDown from './ColumnDropDown'
import AddButton from './AddButton'
import TaskDropTargetWrapper from './TaskDropTargetWrapper'
import TaskProvider from '../context/taskContext'
import {ColumnContext} from '../context/columnContext'

import styles from './css/Column.css'

const Column = ({name, columnId}) => {
  // local state management for drop down column render
  const [isActive, setActive] = useState(false)

  // useContext pull in all tasks from ProjectProvider
  const {column, setColumn, tasks, setTasks} = useContext(ColumnContext)

  console.log('tasks in single column are: ', tasks)

  return (
    <div className={styles.columnContainer}>
      <div className={styles.badgeTitleDotMenu}>
        <div className={styles.badgeAndTitle}>
          <div className={styles.columnBadge}> {tasks.length} </div>
          <div className={styles.columnTitle}> {name} </div>
        </div>

        <div className={styles.newTaskAndMoreOpts}>
          <div className="material-icons"> add </div>
          <div className="material-icons" onClick={() => setActive(!isActive)}>
            more_horiz
          </div>
        </div>

        {isActive && <ColumnDropDown />}
      </div>

      <div className={styles.cardContainer}>
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
  )
}

export default Column
