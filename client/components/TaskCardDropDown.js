import React, {useState, useContext} from 'react'
import Modal from './Modal'
import {ColumnContext} from '../context/columnContext'
import DeleteTaskModal from './DeleteTaskModal'
import styles from './css/TaskCardDropDown.module.css'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, type: 'Edit task'},
  {id: 2, type: 'Delete task'},
  {id: 3, type: 'Close menu'},
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
    if (option === 'Delete task') {
      return setActiveField(option)
    }

    // handle 'Back' selection
    if (option === 'Back') return closeDropDown()

    // otherwise, handle 'Edit' selection
    closeDropDown()
    setActiveTask(task)
    setActiveField(option)
    setSingleTaskVisible(true)
  }

  return (
    <React.Fragment>
      {activeField === 'Delete task' && (
        <Modal>
          <DeleteTaskModal
            task={task}
            closeModal={closeModal}
            closeDropDown={closeDropDown}
          />
        </Modal>
      )}
      <div
        className={
          activeField ? styles.dropdownParentClosed : styles.dropdownParent
        }
      >
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
