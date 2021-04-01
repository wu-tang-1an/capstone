/* eslint-disable camelcase */
import React from 'react'
import RemoveMember from './sub-components/RemoveMember'
import styles from './css/UserCard.module.css'

const UserCard = ({user}) => {
  const {
    firstName,
    lastName,
    imageUrl,
    user_organization,
    orgId,
    removeUser,
  } = user

  const combinedName = firstName + ' ' + lastName

  const {role} = user_organization || ''

  return (
    <div className={styles.userCardContainer}>
      <img className={styles.imageUrl} src={imageUrl} />
      <div className={styles.userCardInfo}>
        <div className={styles.name}>{combinedName}</div>
        <div className={styles.status}>{role}</div>

        <RemoveMember userId={user.id} orgId={orgId} removeUser={removeUser} />
      </div>
    </div>
  )
}

export default UserCard
