import React, {useState, useContext, useEffect, useRef} from 'react'
import styles from './css/AddDialogShared.css'
import {AuthContext} from '../context/authContext'

const AddCommentDialog = ({addComment, closeCommentDialog}) => {
  // set a ref on the outermost container of the dialog to scroll into view on open
  const containerRef = useRef(null)
  useEffect(() => {
    containerRef.current.scrollIntoView()
  })

  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize local state for new comment content
  const [content, setContent] = useState('')

  // submit new comment method calls addComment method passed down by SingleTaskExpanded, which persists new comment in db and updates local task.comments
  const submitNewComment = async (e) => {
    e.preventDefault()

    const newComment = {
      text: content,
      editTimeStamp: new Date(),
    }

    await addComment(newComment, user.id)
  }

  return (
    <div className={styles.addCommentDropDownContainer} ref={containerRef}>
      <textarea
        className={styles.description}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => submitNewComment(e, content)}
        >
          Add comment
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={closeCommentDialog}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default AddCommentDialog
