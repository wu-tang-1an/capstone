import React from 'react'
import {Link} from 'react-router-dom'
import marked from 'marked'
import Comment from './Comment'
import {connect} from 'react-redux'
import {fetchSingleTask} from '../store/singleTask'

const fakeCommentsDB = [
  {
    id: 1,
    name: 'Albert',
    imageUrl: 'https://i.imgur.com/ZoKHJRz.jpg',
    createdAt: '20190614',
    content: 'you got this!',
  },
  {
    id: 2,
    name: 'Felix',
    imageUrl: 'https://i.imgur.com/TUsXHrj.jpg',
    createdAt: '20210314',
    content: 'keep on trucking!',
  },
  {
    id: 3,
    name: 'Sam',
    imageUrl: 'https://i.imgur.com/7nMCKHE.jpg',
    createdAt: '20201225',
    content: 'markdown is awesome!',
  },
]

import styles from './SingleTaskExpanded.css'
class SingleTaskExpanded extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'create homepage',
      issueType: 'todo',
      description: '## markdown is here\n~lets see if it works~',
      collaborators: [],
      activeMarkdownEditor: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // mount task data here
    // this.props.getSingleTask(this.props.match.params.taskId)
  }

  /* componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.taskId
    const currId = this.props.match.params.taskId
    if (!prevId && currId) {
      this.props.getSingleTask(currId)
    }
  } */

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleUpdateTask() {
    // call thunk to update task here
  }

  handleDeleteTask() {
    // call thunk to delete task here
  }

  render() {
    const {name, issueType} = this.state
    const {handleCloseModal} = this.props
    // const {comments} = this.props || []

    // fakeDb: remove after connecting to real db
    const comments = fakeCommentsDB

    const {handleChange, handleUpdateTask, handleDeleteTask} = this
    return (
      <div>
        <div className={styles.singleTaskContainer}>
          <div className={styles.leftPanel}>
            <div className={styles.nameAndIssue}>
              <span className={styles.taskName}>{name}</span>
              <span className={styles.issueType}>{issueType}</span>
            </div>
            <div>
              <div className={styles.containerLabel}>Description:</div>
              {this.state.activeMarkdownEditor ? (
                <textarea
                  className={styles.descriptionMarkdown}
                  ref={(input) => input && input.focus()}
                  onBlur={() =>
                    this.setState({
                      activeMarkdownEditor: false,
                    })
                  }
                  name="description"
                  value={this.state.description || ''}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <div
                  className={styles.descriptionMarkdown}
                  onClick={() =>
                    this.setState({
                      activeMarkdownEditor: true,
                    })
                  }
                  dangerouslySetInnerHTML={{
                    __html: marked(this.state.description),
                  }}
                ></div>
              )}
            </div>
            <div>
              <div className={styles.containerLabel}>Comments:</div>
              <div className={styles.commentsContainer}>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
            <div className={styles.updateAndDeleteBtns}>
              <button type="button" name="update" onClick={handleUpdateTask}>
                Update Task
              </button>
              <button type="button" name="delete" onClick={handleDeleteTask}>
                Delete Task
              </button>
            </div>
            <div className={styles.backToProjectView}>
              <a
                href="#"
                className={styles.spanContainer}
                onClick={handleCloseModal}
              >
                <span className="material-icons">keyboard_arrow_left</span>
                <span>Back to project</span>
              </a>
            </div>
          </div>
          <div className={styles.rightPanel}>
            <div className={styles.label}>label</div>
            <div className={styles.members}>members</div>
            <div className={styles.attachFile}>attachFile</div>
            <div className={styles.projectDate}>projectDate</div>
            <div className={styles.taskChecklist}>taskChecklist</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleTask: state.singleTask,
})

const mapDispatch = (dispatch) => ({
  getSingleTask: (taskId) => dispatch(fetchSingleTask(taskId)),
})

export default connect(mapState, mapDispatch)(SingleTaskExpanded)
