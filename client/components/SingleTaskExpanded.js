import React, {useState} from 'react'
import marked from 'marked'
import Comment from './Comment'
import styles from './css/SingleTaskExpanded.css'

const SingleTaskExpanded = ({task, closeModal}) => {
  const {description, createdBy, isActiveBadge, updatedAt} = task || {}

  // destructure comments separately to type check
  const comments = task && task.comments ? task.comments : []

  // then declare state and initialize with task data
  const [creator, setCreator] = useState(createdBy)
  const [taskDescription, setDescription] = useState(description)
  const [activeMarkdownEditor, setActiveMarkdownEditor] = useState(false)

  return (
    <div>
      <div className={styles.singleTaskContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.nameAndCreator}>
            <span className={styles.taskName}>Task: {description}</span>
            <span className={styles.creator}>Created by: {creator}</span>
          </div>
          <div>
            <div className={styles.containerLabel}>Description:</div>

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
              <div
                className={styles.descriptionMarkdown}
                onClick={() => setActiveMarkdownEditor(true)}
                dangerouslySetInnerHTML={{
                  __html: marked(taskDescription),
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

export default SingleTaskExpanded
