/* eslint-disable complexity */
import React, {useState} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import ColumnProvider from '../context/columnContext'
import TaskProvider from '../context/taskContext'
import styled from 'styled-components'
import TaskCard from './TaskCard'
import AddTaskDialog from './AddTaskDialog'
import ColumnDropDown from './ColumnDropDown'
import styles from './css/Column.module.css'

const TaskList = styled.div``

const DivHell = ({column}) => {
  // local state management for drop down column render
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  // close column drop down method
  const closeDropDown = () => setIsDropDownActive(false)

  // close task dialog
  const closeTaskDialog = () => setIsAddTaskVisible(false)

  // grab column data
  const tasks =
    column && column.tasks ? column.tasks.sort((a, b) => a.index - b.index) : []

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
        <Droppable droppableId={String(column.id)}>
          {(provided) => (
            <div
              className={styles.cardContainer}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks &&
                tasks.map((task, idx) => (
                  <div key={task.id} className={styles.card}>
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

const Column = ({column}) => {
  return (
    <ColumnProvider>
      <TaskList>
        <DivHell column={column} />
      </TaskList>
    </ColumnProvider>
  )
}

export default Column
