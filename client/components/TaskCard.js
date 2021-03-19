import React from 'react'
import {Link} from 'react-router-dom'
import TaskCardDropDown from './TaskCardDropDown'

import styles from './TaskCard.css'
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
    } = this.props.task
    const {isActive} = this.state
    return (
      <div>
        {isActive && <TaskCardDropDown taskId={id} />}
        <div className={styles.taskCardContainer}>
          <div className="material-icons">error_outline</div>
          <div className={styles.titleAndCreator}>
            <div className={styles.title}>{name}</div>
            <div
              className={styles.idAndCreatedBy}
            >{`# opened by ${user.name}`}</div>
          </div>
          <div className={styles.dotMenuAndAvatar}>
            <span
              className="material-icons"
              onClick={() => this.setState({isActive: !isActive})}
            >
              more_horiz
            </span>
            <img src={user.imageUrl} />
          </div>
        </div>
      </div>
    )
  }
}

export default TaskCard
