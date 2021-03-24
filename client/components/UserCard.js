/* eslint-disable camelcase */
import React from 'react'
import styles from './css/UserCard.css'

const UserCard = ({user}) => {
  const {firstName, lastName, imageUrl, user_organization} = user

  const combinedName = firstName + ' ' + lastName

  const {role} = user_organization || ''

  return (
    <div className={styles.userCardContainer}>
      <img className={styles.imageUrl} src={imageUrl} />
      <div className={styles.userCardInfo}>
        <div className={styles.name}>{combinedName}</div>
        <div className={styles.status}>{role}</div>
      </div>
    </div>
  )
}

export default UserCard
