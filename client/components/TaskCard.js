import React from 'react'
import marked from 'marked'
import Comment from './Comment'

const toggleMarkup = (content) => {
  return this.state.textareaFocused ? content : marked(content)
}

class TaskCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      issueType: '',
      description: '',
      isActive: '',
      collaborators: [],
      textareaFocused: false,
    }
  }

  componentDidMount() {
    // mount task data here
  }

  handleChange(evt) {
    const change = toggleMarkup(evt.target.value)
    this.setState({
      [evt.target.name]: change,
    })
  }

  handleUpdateTask() {
    // call thunk to update task here
  }

  handleDeleteTask() {
    // call thunk to delete task here
  }

  render() {
    const {name, issueType} = this.state || ''
    const {comments} = this.props || []
    const {handleUpdateTask, handleDeleteTask} = this
    return (
      <div className="taskCardContainer">
        <div className="leftPanel">
          <div className="nameAndIssue">
            <span className="taskName">{name}</span>
            <span className="issueType">{issueType}</span>
          </div>
          <textarea
            onFocus={() => this.setState({textareaFocused: true})}
            onBlur={() => this.setState({textareaFocused: false})}
          ></textarea>
          <div className="commentsContainer">
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
          <div className="updateAndDeleteBtns">
            <button type="button" name="update" onClick={handleUpdateTask}>
              Update Task
            </button>
            <button type="button" name="delete" onClick={handleDeleteTask}>
              Delete Task
            </button>
          </div>
        </div>
        <div className="rightPanel">
          <div className="label"></div>
          <div className="members"></div>
          <div className="attachFile"></div>
          <div className="projectDate"></div>
          <div className="taskChecklist"></div>
        </div>
      </div>
    )
  }
}

export default TaskCard
