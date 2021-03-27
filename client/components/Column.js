/* eslint-disable complexity */
import React, {useState} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import ColumnProvider from '../context/columnContext'
import TaskProvider from '../context/taskContext'
import styled from 'styled-components'
import TaskCard from './TaskCard'
import AddTaskDialog from './AddTaskDialog'
import ColumnDropDown from './ColumnDropDown'
import styles from './css/Column.css'

const TaskList = styled.div``

const DivHell = ({column}) => {
  // local state management for drop down column render
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  // close column drop down method
  const closeDropDown = () => setIsDropDownActive(false)

  // close task dialog
  const closeTaskDialog = () => setIsAddTaskVisible(false)

  // grab tasks from column
  const {tasks} = column || []

  return (
    <div>
      {isDropDownActive && (
        <ColumnDropDown columnId={column.id} closeDropDown={closeDropDown} />
      )}
      <div className={styles.columnContainer}>
        <div className={styles.badgeTitleDotMenu}>
          <div className={styles.badgeAndTitle}>
            <div className={styles.columnBadge}>
              {tasks && tasks.length ? tasks.length : 0}
            </div>
            <div className={styles.columnTitle}> {column.name} </div>
          </div>
          <div className={styles.newTaskAndMoreOpts}>
            <div
              className="material-icons"
              onClick={() => setIsAddTaskVisible(!isAddTaskVisible)}
            >
              add
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
          {tasks &&
            tasks.map((task, idx) => (
              <div key={task.id}>
                {/* check falsey idx here to only display add task dialog once, at the top of the column */}
                {isAddTaskVisible && !idx && (
                  <AddTaskDialog
                    columnId={column.id}
                    closeTaskDialog={closeTaskDialog}
                  />
                )}
                <TaskProvider>
                  <TaskCard task={task} index={idx} />
                </TaskProvider>
              </div>
            ))}
          {isAddTaskVisible && (!tasks || !tasks.length) && (
            <AddTaskDialog
              columnId={column.id}
              closeTaskDialog={closeTaskDialog}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const Column = ({column}) => {
  return (
    <ColumnProvider>
      <Droppable droppableId={String(column.id)}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            <DivHell column={column} />
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnProvider>
  )
}

export default Column
