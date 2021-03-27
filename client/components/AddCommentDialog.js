import React, {useState, useContext} from 'react'
import styles from './css/AddTaskDialog.css'
import {AuthContext} from '../context/authContext'
import {TaskContext} from '../context/taskContext'
import {addCommentToTaskDB} from '../context/axiosService'
import axios from 'axios'

const AddCommentDialog = ({taskId, closeCommentDialog}) => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // grab column and tasks, setTasks from column context
  const {comments, setComments} = useContext(TaskContext)

  // get this column
  const thisTask = tasks.find((task) => task.id === taskId)

  // initialize local state for new task description
  const [content, setContent] = useState('')

  // add task method updates db/local state before closing dialog
  const addTask = async (e) => {
    e.preventDefault()

    const newComment = {
      text: content,
      editTimeStamp: new Date(),
    }

    try {
      // create new task
      const createdComment = await addCommentToTaskDB(newComment, thisTask.id)

      // associate the new comment with the user who created it
      await axios.put(`/api/comments/${createdComment.id}/users/${user.id}`)

      // fetch the task that holds the new comment
      const {data} = await axios.get(`/api/tasks/${thisTask.id}`)

      // first update the task on local state
      setComments(
        comments.map((comment) => (comment.id === data.id ? data : comment))
      )

      // then update the local state tasks record
      setComments([...comments, createdComment])

      // do NOT close the task dialog -- this allows users
      // to create multiple cards without having to click the +
      // repeatedly!
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.addTaskDropDownContainer}>
      <textarea
        className={styles.description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => addTask(e, description)}
        >
          Add task
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={closeTaskDialog}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default AddTaskDialog
