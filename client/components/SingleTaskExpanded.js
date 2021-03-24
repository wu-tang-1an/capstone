import React, {useState, useContext} from 'react'
import {TaskContext} from '../context/taskContext'
import marked from 'marked'
import Comment from './Comment'
import styles from './css/SingleTaskExpanded.css'

const SingleTaskExpanded = ({closeModal}) => {
  const {task} = useContext(TaskContext)
  const {name, issueType, description, comments} = task

  const [taskName, setName] = useState(name)
  const [taskIssueType, setIssueType] = useState(issueType)
  const [taskDescription, setDescription] = useState(description)
  const [activeMarkdownEditor, setActiveMarkdownEditor] = useState(false)

  return (
    <div>
      <div className={styles.singleTaskContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.nameAndIssue}>
            <span className={styles.taskName}>Task: {taskName}</span>
            <span className={styles.issueType}>
              Issue type: {taskIssueType}
            </span>
          </div>
          <div>
            <div className={styles.containerLabel}>Description:</div>
            {activeMarkdownEditor ? (
              <textarea
                className={styles.descriptionMarkdown}
                ref={(input) => input && input.focus()}
                onBlur={() => setActiveMarkdownEditor(false)}
                name="description"
                value={taskDescription || ''}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            ) : (
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
            <a href="#" className={styles.spanContainer} onClick={closeModal}>
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
