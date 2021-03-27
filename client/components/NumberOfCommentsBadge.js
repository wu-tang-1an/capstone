import React from 'react'
import styles from './css/NumberOfCommentsBadge.css'

const NumberOfCommentsBadge = ({numberOfComments}) => {
  return (
    <div className={styles.numberOfCommentsContainer}>
      <span>{numberOfComments} comments</span>
    </div>
  )
}

export default NumberOfCommentsBadge
