import React from 'react'
import moment from 'moment'

// animate open/close comment edit field

const Comment = (props) => {
  const {comment} = props
  return (
    <div className="commentContainer">
      <div className="nameAndAvatar">
        <img src={comment.imageUrl} />
        <div className="name">{comment.name}</div>
      </div>
      <div className="timeAndDate">
        {moment(comment.createdAt, 'YYYMMDD').fromNow()}
      </div>
      <div className="commentContent">{comment.content}</div>
    </div>
  )
}

export default Comment
