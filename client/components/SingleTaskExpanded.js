import React, {useState} from 'react'
import marked from 'marked'
import moment from 'moment'
import Comment from './Comment'
import ImportantBadge from './ImportantBadge'
import styles from './css/SingleTaskExpanded.css'

const SingleTaskExpanded = ({task, closeModal}) => {
  const {id, name, description, createdBy, isActiveBadge, updatedAt} =
    task || {}

  // destructure comments separately to type check
  const comments = task && task.comments ? task.comments : []

  // then declare state and initialize with task data
  const [creator, setCreator] = useState(createdBy)
  const [taskName, setTaskName] = useState(name)
  const [taskDescription, setDescription] = useState(description)
  const [activeMarkdownEditor, setActiveMarkdownEditor] = useState(false)

  return (
    <div>
      <div className={styles.singleTaskContainer}>
        <div className={styles.nameAndCreator}>
          <div className={styles.badgeNameId}>
            <span className={styles.inlineBadge}>
              <ImportantBadge isActiveBadge={isActiveBadge} />
            </span>
            <span className={styles.taskName}>{taskName}</span>
            <span className={styles.taskId}>{`# ${id}`}</span>
          </div>
          <span className={styles.creator}>{`Opened by ${creator}`}</span>
          <span className={styles.lastEdited}>{`Last edit: ${moment(
            updatedAt
          ).fromNow()}`}</span>
        </div>

        <div className={styles.mainPanel}>
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
            <span className={styles.markdownLink}>
              (new to markdown?
              <a
                href="https://www.markdownguide.org/getting-started/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' click here for an overview'}
              </a>
              )
            </span>
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
            <button
              type="button"
              name="update" /* onClick={handleUpdateTask} */
            >
              Update Task
            </button>
            <button
              type="button"
              name="delete" /* onClick={handleDeleteTask} */
            >
              Delete Task
            </button>
          </div>
          <div className={styles.backToProjectView}>
            <a
              href="#"
              className={styles.spanContainer}
              onClick={() => {
                closeModal()
              }}
            >
              <span className="material-icons">keyboard_arrow_left</span>
              <span>Back to project</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleTaskExpanded
