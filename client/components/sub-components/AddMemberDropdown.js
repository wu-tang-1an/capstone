import React, {useState} from 'react'
import AddMember from './AddMember'
import AddMemDialog from './AddMemDialog'
import styles from '../css/AddOrgDropdown.css'

const AddMemberDropDown = ({orgId}) => {
  const [isDialogActive, setIsDialogActive] = useState(false)
  const closeModal = () => setIsDialogActive(false)

  return (
    <div className={styles.AddOrgDropdownContainer}>
      {!isDialogActive && (
        <div
          className={styles.addIconAndName}
          onClick={() => setIsDialogActive(true)}
        >
          <AddMember />
        </div>
      )}
      {isDialogActive && (
        <div className={styles.content}>
          <AddMemDialog orgId={orgId} closeModal={closeModal} />
        </div>
      )}
    </div>
  )
}

export default AddMemberDropDown
