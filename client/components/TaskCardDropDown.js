import React, {useState, useContext} from 'react'
import Modal from './Modal'
import {ColumnContext} from '../context/columnContext'
import DeleteTaskModal from './DeleteTaskModal'
import socket from '../socket'
import styles from './css/TaskCardDropDown.css'

import axios from 'axios'
import {ProjectContext} from '../context/projectContext'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  // more fields as necessary
]

const TaskCardDropDown = ({task}) => {
  // designate local state to handle modal visibility
  const [activeField, setActiveField] = useState('')

  // closeModal clears activeField
  // used by DeleteTask modal
  const closeModal = () => setActiveField('')

  // grab ColumnProvider value to set visibility and task
  // for SingleTaskExpanded
  const {
    activeTask,
    setActiveTask,
    isSingleTaskVisible,
    setSingleTaskVisible,
  } = useContext(ColumnContext)

  // grab tasks, setTasks from column context
  const {columns, setColumns, tasks, setTasks} = useContext(ProjectContext)

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`)

      const {data} = await axios.get(`/api/columns/${task.columnId}`)

      // the next two calls look inefficient but are absolutely necessary due to an unknown render issue that prevents us from setting tasks directly without first rendering the new column

      setColumns(
        columns.map((column) => (column.id === data.id ? data : column))
      )

      setTasks(tasks.filter((currTask) => currTask.id !== task.id))
    } catch (err) {
      console.error(err)
    }
    socket.emit('delete-task', {ignore: socket.id})
    closeModal()
  }

  // handle drop down selections
  const handleSelectOption = (option) => {
    // handle 'Delete' selection
    if (option === 'Delete') return setActiveField(option)

    // otherwise, handle 'Edit' selection
    setActiveTask(task)
    setActiveField(option)
    setSingleTaskVisible(true)
  }

  return (
    <div>
      <div className={styles.taskCardDropDownContainer}>
        {/* to add fields to dropdown, use fields array above */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={styles.dropDownField}
            onClick={() => handleSelectOption(field.type)}
          >
            <span className={styles.fieldName}>{field.type}</span>
            <span className="arrow material-icons">keyboard_arrow_right</span>
          </div>
        ))}
      </div>
      <div className={styles.arrowDown}></div>
      {activeField === 'Delete' && (
        <Modal>
          <DeleteTaskModal deleteTask={deleteTask} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  )
}

export default TaskCardDropDown
