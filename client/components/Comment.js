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
  const {firstName, imageUrl} = comment.user

  return (
    <div className={styles.commentContainer}>
      <div className={styles.nameAvatarDate}>
        <div className={styles.nameAndAvatar}>
          <img src={imageUrl} />
          <span className={styles.name}>{firstName}</span>
        </div>
        <div className={styles.timeAndDate}>
          {moment(createdAt, 'YYYYMMDD').fromNow()}
        </div>
      </div>
      <div className={styles.contentAndEditDelete}>
        <div>
          <div className={styles.content}>{text}</div>
        </div>
        <div className={styles.editDelete}>
          {/* onClick -> make comment editable, bring up save/close btns */}
          <span>Edit</span>

          <span className={styles.pipeDivide}>|</span>

          {/* onClick -> fire delete comment */}
          <span>Delete</span>
        </div>
      </div>
    </div>
  )
}

export default Comment
