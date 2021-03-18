import React from 'react'
import TaskCardDropDown from './TaskCardDropDown'

class TaskCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // if inactive, onClick dotMenu shows a dropdown
      isActive: false,
    }
  }

  componentDidMount() {
    // mount task here
  }

  render() {
    const {
      id,
      name,
      createdBy,
      createdAt,
      description,
      status,
      user,
    } = this.props
    const {isActive} = this.state
    return (
      <div className="taskCardContainer">
        <div className="issueIcon"></div>
        <div className="titleAndCreator">
          <div className="title"></div>
          <div className="idAndCreatedBy">{`#${id} opened by ${name}`}</div>
        </div>
        <div
          className="dotMenuAndAvatar"
          onClick={() => this.setState({isActive: !isActive})}
        >
          <span className="material-icons">more_horiz</span>
          {isActive && <TaskCardDropDown taskId={id} />}
          <img src={user.imageUrl} />
        </div>
      </div>
    )
  }
}

export default TaskCard
