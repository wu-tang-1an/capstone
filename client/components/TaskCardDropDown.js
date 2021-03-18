import React from 'react'
import {Link} from 'react-router-dom'
import TaskModal from './TaskModal'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit'},
  {id: 2, content: 'Delete'},
  // more fields as necessary
]

class TaskCardDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  render() {
    const {taskId} = this.props || 0
    const {isActive} = this.state
    return (
      <div className="taskCardDropDownContainer">
        {fields.map((field) => (
          <div key={field.id} className="dropDownField">
            {field.content === 'Edit' ? (
              <Link to={`/tasks/${taskId}`}>{field.content}</Link>
            ) : (
              field.content
            )}
            {isActive && <TaskModal type={field.content} />}
          </div>
        ))}
      </div>
    )
  }
}

export default TaskCardDropDown
