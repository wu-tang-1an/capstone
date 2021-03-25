import React, {useState} from 'react'
import AddColumnDialog from './AddColumnDialog'
import styles from './css/AddColumnDropDown.css'

const AddColumnDropDown = () => {
  const [isDialogActive, setIsDialogActive] = useState(false)

  const closeModal = () => setIsDialogActive(false)

  return (
    <div className={styles.addColumnDropDownContainer}>
      {!isDialogActive && (
        <div className={styles.content} onClick={() => setIsDialogActive(true)}>
          <span className="material-icons">add</span>
          <span className={styles.description}>Add a column</span>
        </div>
      )}
      {isDialogActive && <AddColumnDialog closeModal={closeModal} />}
    </div>
  )
}

export default AddColumnDropDown
