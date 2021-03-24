import React, {useState, useContext} from 'react'
import TaskCard from './TaskCard'
import AddTaskDialog from './AddTaskDialog'
import ColumnDropDown from './ColumnDropDown'
import TaskDropTargetWrapper from './TaskDropTargetWrapper'
import TaskProvider from '../context/taskContext'
import {ColumnContext} from '../context/columnContext'
import styles from './css/Column.css'
import {Droppable} from 'react-beautiful-dnd'

const Column = ({columnId}) => {
  // local state management for drop down column render
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  // useContext pull in all tasks from ProjectProvider
  const {column, setColumn, tasks, setTasks} = useContext(ColumnContext)

  return (
    <Droppable droppableId={String(columnId)}>
      {(provided) => (
        <div {...provided.dropableProps} ref={provided.innerRef}>
          {isDropDownActive && <ColumnDropDown />}
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
              {tasks.map((task, index) => (
                <TaskProvider key={task.id} taskId={task.id}>
                  <TaskDropTargetWrapper taskId={task.id}>
                    <TaskCard key={task.id} index={index} id={task.id} />
                  </TaskDropTargetWrapper>
                </TaskProvider>
              ))}
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Column
