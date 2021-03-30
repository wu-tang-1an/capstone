import React, {useState} from 'react'
import AddColumnDialog from './AddColumnDialog'
import styles from './css/AddColumnDropDown.module.css'

const AddColumnDropDown = () => {
  const [isDialogActive, setIsDialogActive] = useState(false)

  const closeModal = () => setIsDialogActive(false)

  return (
    <div className={styles.addColumnDropDownContainer}>
      {!isDialogActive && (
        <div
          className={styles.addIconAndName}
          onClick={() => setIsDialogActive(true)}
        >
          <span className="material-icons">add</span>
          <span className={styles.name}>Add a column</span>
        </div>
      )}
      {isDialogActive && (
        <div className={styles.content}>
          <AddColumnDialog closeModal={closeModal} />
        </div>
      )}
    </div>
  )
}

export default AddColumnDropDown
