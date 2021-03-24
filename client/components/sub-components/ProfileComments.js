import React, {useEffect, useState, useContext} from 'react'
import {AuthContext} from '../../context/authContext'

import styles from '../css/ProfileComments.css'
import axios from 'axios'

const Comments = () => {
  const {user} = useContext(AuthContext)

  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchComments() {
      try {
        let {data} = await axios.get(`/api/users/${user.id}/comments`)
        setComments(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchComments()
  }, [])
  console.log('these are the comments ', comments)
  return (
    <div>
      <h1>Your Comments</h1>
      <div className={styles.commentContainer}>
        {comments.map((comment, index) => {
          const date = new Date(comment.updatedAt).toDateString()
          return (
            <div key={index} className={styles.userCardContainer}>
              <div className={styles.userCardInfo}>
                <p className={styles.commentText}>{comment.text}</p>
                <div className={styles.text}>
                  <span>Created At: </span> {date}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Comments
