import React from 'react'

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Convert to issue', method: handleConvertToIssue},
  {id: 1, content: 'Edit note'},
  {id: 1, content: 'Archive'},
  {id: 1, content: 'Delete task'},
]

class ColumnDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTask: 0,
    }
  }
  componentDidMount() {}

  handleConvertToIssue() {}

  handleArchiveTask() {
    // call update task thunk here
  }

  handleDeleteTask() {
    // call delete task thunk here
  }

  render() {
    const {handleConvertToIssue, handleArchiveTask, handleDeleteTask} = this

    return (
      <div className="columnDropDownContainer">
        {fields.map((field) => (
          <div key={field.id} className="dropDownField">
            {field.content}
          </div>
        ))}
      </div>
    )
  }
}
export default ColumnDropDown
