import React from 'react'

// here we can declare different jsx subcomponents
// and populate our task modal according to the
// "type" prop passed down by TaskCardDropDown

const deleteTaskJSX = (clearActiveField) => (
  <div className="deleteTaskModal">
    <div className="deleteMessage">
      This is action will remove any cards associated with the column.
    </div>
    <button
      type="button"
      name="deleteBtn"
      onClick={() => {
        // call delete task thunk
        clearActiveField()
      }}
    >
      Delete Task
    </button>
    <button type="button" name="cancelBtn" onClick={clearActiveField}>
      Cancel
    </button>
  </div>
)

// getModal(type) returns a function that renders JSX according to the type of dropdown container field (edit, delete, etc.)
// when we invoke this returned function to populate our component's "taskModalContainer", we pass the clearActiveField bound function into it, which allows us to close the modal by resetting the local state of the parent TaskCardDropDown to a falsey value;

const getModal = (type) => {
  switch (type) {
    case 'Delete':
      return deleteTaskJSX
    default:
      return () => {}
  }
}

const TaskModal = (props) => {
  const {type, clearActiveField} = props

  return (
    <div className="taskModalContainer">{getModal(type)(clearActiveField)}</div>
  )
}

export default TaskModal
