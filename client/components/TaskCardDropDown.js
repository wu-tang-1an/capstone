import React, {useState} from 'react'
import Modal from './Modal'
import DeleteTaskModal from './DeleteTaskModal'
import SingleTaskExpanded from './SingleTaskExpanded'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  // more fields as necessary
]

import styles from './css/TaskCardDropDown.css'
const TaskCardDropDown = ({taskId}) => {
  // designate local state to handle modal visibility
  const [activeField, setActiveField] = useState('')

  // closeModal clears activeField
  const closeModal = () => setActiveField('')

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
            {field.type}
          </div>
        ))}
      </div>
      <div className={styles.arrowDown}></div>
      {activeField === 'Delete' && (
        <Modal>
          <DeleteTaskModal closeModal={closeModal} />
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
