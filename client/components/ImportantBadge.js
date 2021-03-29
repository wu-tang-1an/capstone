import React from 'react'
import styles from './css/ImportantBadge.css'

const ImportantBadge = ({isActiveBadge}) => {
  return (
    <div className={styles.importantBadgeContainer}>
      <span className={isActiveBadge ? styles.badgeOn : styles.badgeOff}>
        <i className="material-icons">
          {isActiveBadge ? 'error_outline' : 'assignment'}
        </i>
      </span>
    </div>
  )
}

export default ImportantBadge
