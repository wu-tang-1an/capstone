import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/authContext'
import moment from 'moment'
import styles from './css/Comment.css'

const Comment = ({comment}) => {
  // grab comment text and user who commented from comment
  // passed in directly by SingleTaskExpanded
  const {createdAt, text} = comment

  const {user} = useContext(AuthContext)

  // grab user first name and avatar
  const {firstName, imageUrl} = comment.user

  // initialize local state to track comment content
  const [content, setContent] = useState(text)
  const [isActiveEdit, setActiveEdit] = useState(false)

  return (
    <div className={styles.commentContainer}>
      <div className={styles.userInfoAndContent}>
        <div className={styles.avatarNameTime}>
          <img src={imageUrl} />
          <div className={styles.nameAndTime}>
            <span className={styles.name}>{firstName}</span>
            <span className={styles.timePosted}>
              {moment(createdAt, 'YYYYMMDD').fromNow()}
            </span>
          </div>
        </div>
        {!isActiveEdit && (
          <div
            className={styles.content}
            onClick={() => {
              if (comment.userId === user.id) setActiveEdit(!isActiveEdit)
            }}
          >
            {text}
          </div>
        )}
        {isActiveEdit && (
          <textarea
            className={styles.editCommentTextarea}
            value={content}
            ref={(input) => input && input.focus()}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setActiveEdit(!isActiveEdit)}
          />
        )}
      </div>

      {/* only render edit-delete for user's own comments */}
      {comment.userId === user.id && (
        <div className={styles.editDelete}>
          <span className={styles.edit}>click comment to edit</span>
          <span className={styles.pipeDivide}>|</span>
          <span className={styles.deleteLink}>delete comment</span>
        </div>
      )}
    </div>
  )
}

export default Comment
