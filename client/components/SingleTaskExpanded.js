/* eslint-disable complexity */
import React, {useState, useEffect, useContext} from 'react'
import marked from 'marked'
import moment from 'moment'
import Comment from './Comment'
import ImportantBadge from './ImportantBadge'
import AddCommentDialog from './AddCommentDialog'
import {ProjectContext} from '../context/projectContext'
import axios from 'axios'
import {
  fetchTaskDB,
  updateTaskDB,
  getCommentDB,
  addCommentToTaskDB,
  updateCommentDB,
  deleteCommentDB,
} from '../context/axiosService'
import styles from './css/SingleTaskExpanded.css'

const SingleTaskExpanded = ({task, closeModal}) => {
  // destructure task
  const {id, name, description, createdBy, editTimeStamp, isActiveBadge} =
    task || {}

  // destructure comments separately to type check
  const comments = task && task.comments ? task.comments : []

  // initialize taskComments to track local state for CRUD ops on comments
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
  const [taskName, setTaskName] = useState(name || '')
  const [taskDescription, setDescription] = useState(description || '')
  const [lastEdit, setLastEdit] = useState(editTimeStamp)
  const [activeMarkdownEditor, setActiveMarkdownEditor] = useState(false)
  const [isAddCommentActive, setAddCommentActive] = useState(false)
  const [isActiveNameEdit, setActiveNameEdit] = useState(false)

  const {taskChanged, setTaskChanged, refreshProjectBoard} = useContext(
    ProjectContext
  )

  // deleteComment removes comment from db
  // local state will reload on single task view
  const deleteComment = async (commentId) => {
    await deleteCommentDB(commentId)
    setTaskComments(taskComments.filter((comment) => comment.id !== commentId))
    setTaskChanged(!taskChanged)
  }

  // editComment updates comment in db, local state
  const editComment = async (commentId, updateInfo) => {
    const updatedComment = await updateCommentDB(commentId, updateInfo)
    setTaskComments(
      taskComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    )
    setTaskChanged(!taskChanged)
    return updatedComment
  }

  // addComment adds comment in db, local state
  const addComment = async (newComment, userId) => {
    try {
      // create new comment
      const createdComment = await addCommentToTaskDB(newComment, task.id)

      // associate the new comment with the user who created it
      await axios.put(`/api/comments/${createdComment.id}/users/${userId}`)

      // refetch comment
      const associatedComment = await getCommentDB(createdComment.id)

      // update local comments state
      setTaskComments([...taskComments, associatedComment])

      // do NOT close the comment dialog -- allows the user to type multiple comments without having to repeatedly click to open the text field!
      setTaskChanged(!taskChanged)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.singleTaskContainer}>
      <section className={styles.fixedHeader}>
        <div className={styles.backToProjectView}>
          <a
            href="#"
            className={styles.spanContainer}
            onClick={() => {
              closeModal()
            }}
          >
            <span>Back to project</span>
          </a>
        </div>
        <div className={styles.nameAndCreator}>
          <div className={styles.badgeNameId}>
            <span className={styles.inlineBadge}>
              <ImportantBadge isActiveBadge={isActiveBadge} />
            </span>
            <span className={styles.taskId}>{`#${id}`}</span>
            {!isActiveNameEdit && (
              <div className={styles.nameAndEditIcon}>
                <span
                  className={styles.taskName}
                  onClick={() => setActiveNameEdit(true)}
                >
                  {taskName} <i className="material-icons">create</i>
                </span>
              </div>
            )}
            {isActiveNameEdit && (
              <textarea
                className={styles.editName}
                ref={(input) => input && input.focus()}
                defaultValue={name}
                onChange={(e) => setTaskName(e.target.value)}
                onBlur={async () => {
                  // get a new timeStamp for the edit
                  const newTimeStamp = new Date()
                  // PUT the new task in the db
                  const updateInfo = {
                    name: taskName,
                    editTimeStamp: newTimeStamp,
                  }
                  const updatedTask = await updateTaskDB(updateInfo, task.id)
                  await refreshProjectBoard()
                  setActiveNameEdit(false)
                  setLastEdit(updatedTask.editTimeStamp)
                }}
              ></textarea>
            )}
          </div>
          <span className={styles.creator}>Opened by {createdBy}</span>
          <span className={styles.lastEdited}>{`Last edit: ${moment(
            new Date(Date.parse(lastEdit)),
            'YYYYMMDD'
          ).fromNow()}`}</span>
        </div>
      </section>
      <section className={styles.mainPanel}>
        <div className={styles.descriptionContainer}>
          <div className={styles.containerLabel}>
            <span>Task description</span>
            <span className={styles.smol}>click below to edit</span>
          </div>
          {/* when markdown editor has focus, it is a textarea */}
          {activeMarkdownEditor && (
            <textarea
              className={styles.descriptionMarkdown}
              ref={(input) => input && input.focus()}
              onBlur={async () => {
                // get a new timeStamp for the edit
                const newTimeStamp = new Date()
                // PUT task db
                const updateInfo = {
                  description: taskDescription,
                  editTimeStamp: newTimeStamp,
                }
                const updatedTask = await updateTaskDB(updateInfo, id)
                await refreshProjectBoard()
                setActiveMarkdownEditor(false)
                setLastEdit(updatedTask.editTimeStamp)
              }}
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
          <div className={styles.containerLabel}>Comments</div>
          <div className={styles.commentsContainer}>
            {!taskComments.length && (
              <div className={styles.noCommentMessage}>
                <span>
                  Be the first to comment on
                  <strong>{` ${task.name}`}</strong>
                </span>
              </div>
            )}
            {/* sort taskComments by editTimeStamp to put in descending chronological order */}
            {taskComments
              .sort((a, b) => (a.editTimeStamp < b.editTimeStamp ? -1 : 1))
              .map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  deleteComment={deleteComment}
                  editComment={editComment}
                />
              ))}
            {!isAddCommentActive && (
              <div className={styles.btnContainer}>
                <button
                  type="button"
                  className={styles.addCommentBtn}
                  onClick={() => setAddCommentActive(!isAddCommentActive)}
                >
                  Add a comment
                </button>
              </div>
            )}
            {isAddCommentActive && (
              <AddCommentDialog
                addComment={addComment}
                closeCommentDialog={() =>
                  setAddCommentActive(!isAddCommentActive)
                }
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SingleTaskExpanded
