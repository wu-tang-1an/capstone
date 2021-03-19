import React from 'react'
import {Link} from 'react-router-dom'
import DeleteTaskModal from './DeleteTaskModal'
import SingleTaskExpanded from './SingleTaskExpanded'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  // more fields as necessary
]

import styles from './TaskCardDropDown.css'
class TaskCardDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeField: '',
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
  }

  // clear active field closes an open task modal by resetting active field to a falsey value
  handleCloseModal() {
    this.setState({
      activeField: '',
    })
  }

  handleOpenModal(taskType) {
    this.setState({
      activeField: taskType,
    })
  }

  render() {
    const {taskId} = this.props || 0
    const {activeField} = this.state
    const {handleCloseModal, handleOpenModal} = this

    return (
      <div>
        <div className={styles.taskCardDropDownContainer}>
          {/* keep things extensible here by mapping over a fields array and sending the type of field to the TaskModal, which will render with content according to activeField */}
          {fields.map((field) => (
            <div
              key={field.id}
              className={styles.dropDownField}
              onClick={() => {
                this.setState({activeField: field.type})
              }}
            >
              {field.type === 'Edit' ? (
                <div className={styles.fieldContainer}>
                  <a href="#">{field.type}</a>
                  <span className="material-icons">keyboard_arrow_right</span>
                </div>
              ) : field.type === 'Delete' ? (
                <div className={styles.fieldContainer}>
                  <a onClick={() => handleOpenModal(field.type)} href="#">
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
          <DeleteTaskModal
            handleCloseModal={handleCloseModal}
            taskId={taskId}
          />
        )}
        {activeField === 'Edit' && (
          <div>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.transparentBlockContainer}>
              <SingleTaskExpanded
                handleCloseModal={handleCloseModal}
                taskId={taskId}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TaskCardDropDown
