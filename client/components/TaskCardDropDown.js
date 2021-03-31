import React, {useState, useContext} from 'react'
import Modal from './Modal'
import {ColumnContext} from '../context/columnContext'
import DeleteTaskModal from './DeleteTaskModal'
import styles from './css/TaskCardDropDown.module.css'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  {id: 3, type: 'Back'},
  // more fields as necessary
]

const TaskCardDropDown = ({task, closeDropDown}) => {
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

  // handle drop down selections
  const handleSelectOption = (option) => {
    // handle 'Delete' selection
    if (option === 'Delete') return setActiveField(option)
    if (option === 'Back') return closeDropDown()

    // otherwise, handle 'Edit' selection
    setActiveTask(task)
    setActiveField(option)
    setSingleTaskVisible(true)
  }

  return (
    <React.Fragment>
      {activeField === 'Delete' && (
        <Modal>
          <DeleteTaskModal task={task} closeModal={closeModal} />
        </Modal>
      )}
      <div className={styles.dropdownParent}>
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
      </div>
    </React.Fragment>
  )
}

export default TaskCardDropDown
