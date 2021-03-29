import React, {useState} from 'react'
import AddOrgDialog from './AddOrgDialog'
import styles from './css/AddOrgDropdown.css'

const AddOrgDropDown = () => {
  const [isDialogActive, setIsDialogActive] = useState(false)

  const closeModal = () => setIsDialogActive(false)

  return (
    <div className={styles.AddOrgDropdownContainer}>
      {!isDialogActive && (
        <div
          className={styles.addIconAndName}
          onClick={() => setIsDialogActive(true)}
        >
          <span className="material-icons">add</span>
          <span className={styles.name}>Add Organization</span>
        </div>
      )}
      {isDialogActive && (
        <div className={styles.content}>
          <AddOrgDialog closeModal={closeModal} />
        </div>
      )}
    </div>
  )
}

export default AddOrgDropDown
