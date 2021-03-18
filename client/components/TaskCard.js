import React from 'react'
import marked from 'marked'

const toggleMarkup = (content) => {
  return this.state.textareaFocused ? content : marked(content)
}

class TaskCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      isActive: '',
      collaborators: [],
      textareaFocused: false,
    }
  }

  componentDidMount() {}

  handleUpdateTask() {}

  handleDeleteTask() {}

  render() {
    const {comments} = this.props || []
    const {handleUpdateTask, handleDeleteTask} = this
    return (
      <div className="taskCardContainer">
        <div className="leftPanel">
          <div className="nameAndIssue">
            <span className="taskName"></span>
            <span className="issueType"></span>
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
            <button type="button" name="delete" onClick={handleUpdateTask}>
              Delete Task
            </button>
          </div>
        </div>
        <div className="rightPanel"></div>
      </div>
    )
  }
}

export default TaskCard
