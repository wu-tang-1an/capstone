import React from 'react'

class TaskCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  componentDidMount() {
    // mount task here
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
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
    return (
      <div className="taskCardContainer">
        <div className="issueIcon"></div>
        <div className="titleAndCreator">
          <div className="title"></div>
          <div className="idAndCreatedBy">{`#${id} opened by ${name}`}</div>
        </div>
        <div className="dotMenuAndAvatar">
          <span className="material-icons">more_horiz</span>
          <img src={user.imageUrl} />
        </div>
      </div>
    )
  }
}

export default TaskCard
