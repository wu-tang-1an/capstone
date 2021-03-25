import React, {useContext} from 'react'
import {AuthContext} from '../context/authContext'
import moment from 'moment'
import styles from './css/Comment.css'

const Comment = ({comment}) => {
  // grab comment text and user who commented from comment
  // passed in directly by SingleTaskExpanded
  const {createdAt, text} = comment

  const {user} = useContext(AuthContext)

  // grab user first name and avatar
  const {firstName, imageUrl} = user

  return (
    <div className={styles.commentContainer}>
      <div className={styles.nameAndAvatar}>
        <img src={imageUrl} />
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
