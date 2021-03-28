import React from 'react'
import styles from './css/NumberOfCommentsBadge.css'

const NumberOfCommentsBadge = ({numberOfComments}) => {
  return (
    <div className={styles.numberOfCommentsContainer}>
      <span>
        <i className="material-icons">
          {numberOfComments === 0
            ? 'chat_bubble_outline'
            : numberOfComments === 1
            ? 'chat_bubble'
            : 'forum'}
        </i>
        {numberOfComments}
      </span>
    </div>
  )
}

export default NumberOfCommentsBadge
