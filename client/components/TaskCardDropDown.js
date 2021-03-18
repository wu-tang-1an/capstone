import React from 'react'
import {Link} from 'react-router-dom'
import TaskModal from './TaskModal'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  // more fields as necessary
]

class TaskCardDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeField: '',
    }
    this.clearActiveField = this.clearActiveField.bind(this)
  }

  // clear active field closes an open task modal by resetting active field to a falsey value
  clearActiveField() {
    this.setState({
      activeField: '',
    })
  }

  render() {
    const {taskId} = this.props || 0
    const {activeField} = this.state
    const {clearActiveField} = this

    return (
      <div className="taskCardDropDownContainer">
        {/* keep things extensible here by mapping over a fields array and sending the type of field to the TaskModal, which will render with content according to activeField */}
        {!activeField &&
          fields.map((field) => (
            <div
              key={field.id}
              className="dropDownField"
              onClick={() => {
                this.setState({activeField: field.type})
              }}
            >
              {field.type === 'Edit' ? (
                <Link to={`/tasks/${taskId}`}>{field.type}</Link>
              ) : (
                field.type
              )}
            </div>
          ))}
        {activeField && (
          <TaskModal type={activeField} clearActiveField={clearActiveField} />
        )}
      </div>
    )
  }
}

export default TaskCardDropDown
