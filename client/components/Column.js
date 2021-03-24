import React, {useState} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import TaskCard from './TaskCard'
import AddTaskDialog from './AddTaskDialog'
import ColumnDropDown from './ColumnDropDown'

import styles from './css/Column.css'

const TaskList = styled.div``

const Column = ({column}) => {
  // local state management for drop down column render
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  // close drop down method
  const cancel = () => setIsDropDownActive(false)

  // grab column data
  const {tasks} = column

  return (
    <Droppable droppableId={String(column.id)}>
      {(provided) => (
        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
          <div>
            {isDropDownActive && (
              <ColumnDropDown columnId={column.id} cancel={cancel} />
            )}
            <div className={styles.columnContainer}>
              <div className={styles.badgeTitleDotMenu}>
                <div className={styles.badgeAndTitle}>
                  <div className={styles.columnBadge}>
                    {' '}
                    {tasks && tasks.length ? tasks.length : 0}{' '}
                  </div>
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
                {tasks &&
                  tasks.length &&
                  tasks.map((task, idx) => (
                    <div key={task.id}>
                      {isAddTaskVisible && idx === 0 && (
                        <AddTaskDialog
                          task={task}
                          cancel={() => setIsAddTaskVisible(false)}
                        />
                      )}
                      <TaskCard task={task} index={idx} />
                    </div>
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
