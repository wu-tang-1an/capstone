/* eslint-disable camelcase */
import React, {useEffect, useState} from 'react'
import RemoveMember from './sub-components/RemoveMember'
import isAdmin from './helper/isAdmin'
import styles from './css/UserCard.module.css'

const UserCard = ({user}) => {
  const {
    firstName,
    lastName,
    imageUrl,
    user_organization,
    orgId,
    removeUser,
    mainUser,
  } = user

  const [isOrgAdmin, setOrgAdmin] = useState(false)

  useEffect(() => {
    const fetchAdmin = async () => {
      setOrgAdmin(await isAdmin(mainUser.id, orgId))
    }

    fetchAdmin()
  }, [])

  const combinedName = firstName + ' ' + lastName

  const {role} = user_organization || ''

  return (
    <div className={styles.userCardContainer}>
      <img className={styles.imageUrl} src={imageUrl} />
      <div className={styles.userCardInfo}>
        <div className={styles.name}>{combinedName}</div>
        <div className={styles.status}>{role}</div>

        {isOrgAdmin ? (
          <RemoveMember
            userId={user.id}
            orgId={orgId}
            removeUser={removeUser}
          />
        ) : null}
      </div>
    </div>
  )
}

export default UserCard
