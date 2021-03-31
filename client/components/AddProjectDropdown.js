import React, {useState} from 'react'
import AddProjectDialog from './AddProjectDialog'

import styles from './css/AddOrgDropdown.module.css'

const AddProjectDropdown = ({organization, setProjects}) => {
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
          <span className={styles.name}>Add Project</span>
        </div>
      )}
      {isDialogActive && (
        <div className={styles.content}>
          <AddProjectDialog
            organization={organization}
            setProjects={setProjects}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  )
}

export default AddProjectDropdown
