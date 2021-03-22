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

import styles from './TaskCardDropDown.css'
const TaskCardDropDown = ({taskId}) => {
  // designate local state to handle modal visibility
  const [activeField, setActiveField] = useState('')

  // closeModal sets activeField to ES
  const closeModal = () => setActiveField('')

  // openModal sets activeField to fieldType, ex. 'Delete'
  const openModal = (taskType) => setActiveField(taskType)

  return (
    <div>
      <div className={styles.taskCardDropDownContainer}>
        {/* keep things extensible here by mapping over a fields array and sending the type of field to the TaskModal, which will render with content according to activeField */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={styles.dropDownField}
            onClick={() => setActiveField(field.type)}
          >
            {field.type === 'Edit' ? (
              <div className={styles.fieldContainer}>
                <a href="#">{field.type}</a>
                <span className="material-icons">keyboard_arrow_right</span>
              </div>
            ) : field.type === 'Delete' ? (
              <div className={styles.fieldContainer}>
                <a onClick={() => openModal(field.type)} href="#">
                  {field.type}
                </a>
                <span className="material-icons">keyboard_arrow_right</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className={styles.arrowDown}></div>
      {activeField === 'Delete' && (
        <Modal>
          <DeleteTaskModal closeModal={closeModal} taskId={taskId} />
        </Modal>
      )}
      {activeField === 'Edit' && (
        <Modal>
          <SingleTaskExpanded closeModal={closeModal} taskId={taskId} />
        </Modal>
      )}
    </div>
  )
}

export default TaskCardDropDown
