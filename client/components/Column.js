import React, {useState, useContext} from 'react'
import {connect} from 'react-redux'
import TaskCard from './TaskCard'
import ColumnDropDown from './ColumnDropDown'
import {fetchAllTasks, fetchUpdateTask} from '../store/tasks'
import AddButton from './AddButton'
import TaskDropTargetWrapper from './TaskDropTargetWrapper'
import {ProjectContext} from './ProjectProvider'

import styles from './css/Column.css'
const Column = ({name, columnId}) => {
  // local state management for drop down column render
  const [isActive, setActive] = useState(false)

  // useContext pull in all tasks from ProjectProvider
  const {columns, setColumns, tasks, setTasks} = useContext(ProjectContext)

  // thisColumn selects the appropriate column data from all columns
  const thisColumn = columns.find((column) => column.id === columnId)

  // theseTasks selects appropriate tasks (where thisColumn owns them) from all tasks
  const theseTasks = tasks.filter((task) => task.columnId === columnId)

  return (
    <div className={styles.columnContainer}>
      <div className={styles.badgeTitleDotMenu}>
        <div className={styles.badgeAndTitle}>
          <div className={styles.columnBadge}> {theseTasks.length} </div>{' '}
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
        {theseTasks.map((task) => (
          <TaskDropTargetWrapper key={task.id} columnId={columnId}>
            <TaskCard taskId={task.id} name={task.description} />{' '}
          </TaskDropTargetWrapper>
        ))}{' '}
        <AddButton columnId={columnId} />{' '}
      </div>{' '}
    </div>
  )
}

const mapState = (state) => ({
  tasks: state.tasks,
})

const mapDispatch = (dispatch) => ({
  getAllTasks: () => dispatch(fetchAllTasks()),
  updateTask: (taskId, updateInfo) =>
    dispatch(fetchUpdateTask(taskId, updateInfo)),
})

export default connect(mapState, mapDispatch)(Column)
