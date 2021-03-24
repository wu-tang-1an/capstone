import React from 'react'
import moment from 'moment'

// animate open/close comment edit field
import styles from './css/Comment.css'
const Comment = ({comment}) => {
  // grab comment text and user who commented from comment
  // passed in directly by SingleTaskExpanded
  const {createdAt, text, user} = comment

  // grab user first name and avatar
  const {firstName, imageUrl} = user

  return (
    <div className={styles.commentContainer}>
      <div className={styles.nameAndAvatar}>
        <img src={comment.imageUrl} />
        <div className={styles.name}>{firstName}</div>
        <div className={styles.timeAndDate}>
          {moment(createdAt, 'YYYYMMDD').fromNow()}
        </div>
      </div>
      <div>
        <div className={styles.commentContent}>{text}</div>
      </div>
    </div>
  )
}

export default Comment
