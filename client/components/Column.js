import React, {useState, useContext} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import TaskCard from './TaskCard'
import AddTaskDialog from './AddTaskDialog'
import ColumnDropDown from './ColumnDropDown'
import TaskProvider from '../context/taskContext'
import {ColumnContext} from '../context/columnContext'

import styles from './css/Column.css'

const TaskList = styled.div``

const Column = () => {
  // local state management for drop down column render
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  // useContext pull in all tasks from ProjectProvider
  const {column, setColumn, tasks, setTasks} = useContext(ColumnContext)

  return (
    <Droppable droppableId={String(column.id)}>
      {(provided) => (
        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
          <div>
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
                    <TaskCard taskId={task.id} index={index} />
                  </TaskProvider>
                ))}
              </div>
            </div>
          </div>
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  )
}

export default Column
