import React, {useState, useContext} from 'react'
import TaskCard from './TaskCard'
import ColumnDropDown from './ColumnDropDown'
import AddButton from './AddButton'
import TaskDropTargetWrapper from './TaskDropTargetWrapper'
import {ColumnContext} from '../context/columnContext'

import styles from './css/Column.css'

const Column = ({name, columnId}) => {
  // local state management for drop down column render
  const [isActive, setActive] = useState(false)

  // useContext pull in all tasks from ProjectProvider
  const {columns, setColumns, tasks, setTasks} = useContext(ColumnContext)

  return (
    <div className={styles.columnContainer}>
      <div className={styles.badgeTitleDotMenu}>
        <div className={styles.badgeAndTitle}>
          <div className={styles.columnBadge}> {tasks.length} </div>{' '}
          <div className={styles.columnTitle}> {name} </div>{' '}
        </div>{' '}
        <div className={styles.newTaskAndMoreOpts}>
          {' '}
          {/* material-icons is delivered from index.html with every route -- we can simply use "material-icons" className whenever we want to render an icon */}{' '}
          <div className="material-icons"> add </div>{' '}
          <div className="material-icons" onClick={() => setActive(!isActive)}>
            more_horiz{' '}
          </div>{' '}
        </div>{' '}
        {isActive && <ColumnDropDown />}{' '}
      </div>{' '}
      <div className={styles.cardContainer}>
        {' '}
        {tasks.map((task) => (
          <TaskDropTargetWrapper key={task.id} columnId={columnId}>
            <TaskCard taskId={task.id} description={task.description} />{' '}
          </TaskDropTargetWrapper>
        ))}{' '}
        {/* <AddButton columnId={columnId} />{' '} */}
      </div>{' '}
    </div>
  )
}

export default Column
