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
      <div className={styles.taskCardContainer}>
        <div className="material-icons">error_outline</div>
        <div className={styles.titleAndCreator}>
          <Link to={`/tasks/${id}`}>
            <div className={styles.title}>{name}</div>
          </Link>
          <div
            className={styles.idAndCreatedBy}
          >{`#${id} opened by ${user.name}`}</div>
        </div>
        <div
          className={styles.dotMenuAndAvatar}
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
