import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/authContext'
import moment from 'moment'
import styles from './css/Comment.module.css'

const Comment = ({comment, editComment, deleteComment}) => {
  // grab user from auth context to check read/write permissions
  const {user} = useContext(AuthContext)

  // initialize local state to track comment content
  const [thisComment, setComment] = useState(comment)
  const [localTime, setLocalTime] = useState(comment.editTimeStamp)
  const [content, setContent] = useState(comment.text)
  const [isActiveEdit, setActiveEdit] = useState(false)

  // grab comment text and user who commented from comment
  // passed in directly by SingleTaskExpanded
  const {id, text} = thisComment

  // grab user first name and avatar
  const {firstName, imageUrl} = thisComment.user

  return (
    <div className={styles.commentContainer}>
      <div className={styles.userInfoAndContent}>
        <div className={styles.avatarNameTime}>
          <img src={imageUrl} />
          <div className={styles.nameAndTime}>
            <span className={styles.name}>{firstName}</span>
            <span className={styles.timePosted}>
              {moment(new Date(Date.parse(localTime)), 'YYYYMMDD').fromNow()}
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
            onBlur={async () => {
              // update comment and return from db
              const updatedComment = await editComment(id, {
                text: content,
                editTimeStamp: new Date(),
              })

              // update comment on local state
              setComment(updatedComment)
              setLocalTime(updatedComment.editTimeStamp)
              setActiveEdit(!isActiveEdit)
            }}
          />
        )}
      </div>

      {/* only render edit-delete for user's own comments */}
      {comment.userId === user.id && (
        <div className={styles.editDelete}>
          <span className={styles.edit}>click comment to edit</span>
          <span className={styles.pipeDivide}>|</span>
          <span className={styles.deleteLink} onClick={() => deleteComment(id)}>
            delete comment
          </span>
        </div>
      )}
    </div>
  )
}

export default Comment
