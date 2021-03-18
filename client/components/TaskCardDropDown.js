import React from 'react'
import {Link} from 'react-router-dom'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit'},
  {id: 2, content: 'Delete'},
  // more fields as necessary
]

const TaskCardDropDown = (props) => {
  const handleDeleteTask = () => {
    // call delete task thunk here
  }

  const {taskId} = props

  return (
    <div className="taskDropDownContainer">
      {fields.map((field) => (
        <div key={field.id} className="dropDownField">
          {field.content === 'Edit' ? (
            <Link to={`/tasks/${taskId}`}>{field.content}</Link>
          ) : (
            <div onClick={() => handleDeleteTask(taskId)}>{field.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}
export default TaskCardDropDown
