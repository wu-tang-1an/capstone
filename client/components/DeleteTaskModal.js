import React from 'react'
import {connect} from 'react-redux'
import styles from './DeleteTaskModal.css'
import {fetchDeleteTask} from '../store/tasks'

const DeleteTaskModal = (props) => {
  const {taskId, deleteTask, handleCloseModal} = props

  return (
    <div className={styles.taskModalContainer}>
      <div className={styles.centeredModalBlock}>
        <div className={styles.modalTitleAndCloseBtn}>
          <div className={styles.modalTitle}>Delete Task</div>
          <div className={styles.closeModalBtn}>
            <span className="material-icons" onClick={handleCloseModal}>
              close
            </span>
          </div>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.deleteMessage}>
            This is action will remove any cards associated with the column.
          </div>
          <div className={styles.modalBtnsContainer}>
            <button
              type="button"
              name="deleteBtn"
              onClick={async () => {
                // delete task and close modal
                await deleteTask(taskId)
                handleCloseModal()
              }}
            >
              Delete Task
            </button>
            <button type="button" name="cancelBtn" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => ({
  deleteTask: (taskId) => dispatch(fetchDeleteTask(taskId)),
})

export default connect(null, mapDispatch)(DeleteTaskModal)
