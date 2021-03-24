import React, {useState, useContext} from 'react'
import Modal from './Modal'
import DeleteTaskModal from './DeleteTaskModal'
import SingleTaskExpanded from './SingleTaskExpanded'
import styles from './css/TaskCardDropDown.css'

import axios from 'axios'
import {ColumnContext} from '../context/columnContext'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  // more fields as necessary
]

const TaskCardDropDown = ({taskId}) => {
  // designate local state to handle modal visibility
  const [activeField, setActiveField] = useState('')

  // closeModal clears activeField
  const closeModal = () => setActiveField('')

  const {tasks, setTasks} = useContext(ColumnContext)

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${taskId}`)
    } catch (err) {
      console.error(err)
    }

    setTasks(tasks.filter((task) => task.id !== taskId))
    closeModal()
  }

  return (
    <div>
      <div className={styles.taskCardDropDownContainer}>
        {/* to add fields to dropdown, use fields array above */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={styles.dropDownField}
            onClick={() => setActiveField(field.type)}
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
      {activeField === 'Edit' && (
        <Modal>
          <SingleTaskExpanded closeModal={closeModal} />
        </Modal>
      )}
    </div>
  )
}

export default TaskCardDropDown
