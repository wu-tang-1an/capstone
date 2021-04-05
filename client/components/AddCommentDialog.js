import React, {useState, useContext, useEffect, useRef} from 'react'
import styles from './css/AddDialogShared.module.css'
import {AuthContext} from '../context/authContext'
import {notify} from './helper/toast'
import strConstraints from './helper/strConstrain'

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

    if (content.length > strConstraints.textMaxChar)
      return notify(
        `Comment limited to ${strConstraints.textMaxChar} characters!`,
        'error'
      )

    const newComment = {
      text: content,
      editTimeStamp: new Date(),
    }

    await addComment(newComment, user.id)
    setContent('')
  }

  return (
    <div className={styles.addCommentDropDownContainer} ref={containerRef}>
      <textarea
        className={styles.description}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{border: '1px solid lightgrey', marginTop: '1em'}}
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
