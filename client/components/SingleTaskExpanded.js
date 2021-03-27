/* eslint-disable complexity */
import React, {useState, useEffect} from 'react'
import marked from 'marked'
import moment from 'moment'
import Comment from './Comment'
import ImportantBadge from './ImportantBadge'
import {
  fetchTaskDB,
  updateCommentDB,
  deleteCommentDB,
} from '../context/axiosService'
import styles from './css/SingleTaskExpanded.css'

const SingleTaskExpanded = ({task, closeModal}) => {
  // destructure task
  const {id, name, description, createdBy, isActiveBadge, updatedAt} =
    task || {}

  // destructure comments separately to type check
  const comments = task && task.comments ? task.comments : []

  // initialize taskComments above useEffect to track dependency
  const [taskComments, setTaskComments] = useState([])

  // fetch task
  useEffect(() => {
    let isMounted = true
    const getTask = async () => {
      try {
        task = await fetchTaskDB(task.id)
        setTaskComments(comments)
      } catch (err) {
        console.error(err)
      }
    }
    getTask()
    return () => {
      isMounted = false
    }
  }, [task])

  // then declare state and initialize with task data
  const [creator, setCreator] = useState(createdBy || '')
  const [taskName, setTaskName] = useState(name || '')
  const [taskDescription, setDescription] = useState(description || '')
  const [activeMarkdownEditor, setActiveMarkdownEditor] = useState(false)

  // deleteComment removes comment from db
  // local state will reload on single task view
  const deleteComment = async (commentId) => {
    await deleteCommentDB(commentId)
    setTaskComments(taskComments.filter((comment) => comment.id !== commentId))
  }

  // editComment updates comment in db, local state
  const editComment = async (commentId, updateInfo) => {
    const updatedComment = await updateCommentDB(commentId, updateInfo)

    console.log(moment(updatedComment.updatedAt, 'YYYYMMDD').fromNow())

    console.log('updatedComment is:', updatedComment)

    setTaskComments(
      taskComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    )

    return updatedComment
  }

  return (
    <div>
      <div className={styles.singleTaskContainer}>
        <div className={styles.infoBar}>
          <div className={styles.nameAndCreator}>
            <div className={styles.badgeNameId}>
              <span className={styles.inlineBadge}>
                <ImportantBadge isActiveBadge={isActiveBadge} />
              </span>
              <span className={styles.taskId}>{`#${id}`}</span>
              <span className={styles.taskName}>{taskName}</span>
            </div>
            <span className={styles.creator}>{`Opened by ${creator}`}</span>
            <span className={styles.lastEdited}>{`Last edit: ${moment(
              updatedAt
            ).fromNow()}`}</span>
          </div>
          <div className={styles.backToProjectView}>
            <a
              href="#"
              className={styles.spanContainer}
              onClick={() => {
                closeModal()
              }}
            >
              <i className="material-icons">keyboard_arrow_left</i>
              <span>Back to project</span>
            </a>
          </div>
        </div>

        <div className={styles.mainPanel}>
          <div className={styles.descriptionContainer}>
            <div className={styles.containerLabel}>
              <span>Task description</span>
              <span className={styles.smol}>
                click below to edit | markdown enabled
              </span>
            </div>
            {/* when markdown editor has focus, it is a textarea */}
            {activeMarkdownEditor && (
              <textarea
                className={styles.descriptionMarkdown}
                ref={(input) => input && input.focus()}
                onBlur={() => setActiveMarkdownEditor(false)}
                name="description"
                value={taskDescription || ''}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            )}
            {/* when markdown editor does not have focus it is a div that renders its innerHTML as markdown */}
            {!activeMarkdownEditor && (
              <div className={styles.inactiveMarkdownContainer}>
                <div
                  className={styles.descriptionMarkdown}
                  onClick={() => setActiveMarkdownEditor(true)}
                  dangerouslySetInnerHTML={{
                    __html: marked(taskDescription),
                  }}
                ></div>
              </div>
            )}
            <div className={styles.markdownLink}>
              (new to markdown?
              <a
                href="https://www.markdownguide.org/getting-started/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' click here for an overview'}
              </a>
              )
            </div>
          </div>
          <div>
            <div className={styles.containerLabel}>Comments:</div>
            <div className={styles.commentsContainer}>
              {taskComments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  deleteComment={deleteComment}
                  editComment={editComment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleTaskExpanded
