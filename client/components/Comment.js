import React from 'react'
import moment from 'moment'

// animate open/close comment edit field
import styles from './Comment.css'
const Comment = (props) => {
  const {comment} = props

  return (
    <div className={styles.commentContainer}>
      <div className={styles.nameAndAvatar}>
        <img src={comment.imageUrl} />
        <div className={styles.name}>{comment.name}</div>
      </div>
      <div className={styles.timeAndDate}>
        {moment(comment.createdAt, 'YYYYMMDD').fromNow()}
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
    </div>
  )
}

export default Comment
