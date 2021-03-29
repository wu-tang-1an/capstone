import React, {useState} from 'react'
import Modal from './Modal'

import styles from './css/ColumnDropDown.css'

const EditProjectModal = ({project, setProjects, closeModal}) => {
  const [name, setName] = useState(project.name)

  const editProject = () => {
    setProjects()
  }

  return (
    <Modal>
      <div className={styles.modalContent}>
        <div className={styles.newColumnName}>New project name</div>
        <input
          type="text"
          className={styles.columnNameInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.modalBtnsContainer}>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => {
              //   editColumn()
              closeModal()
            }}
          >
            Save
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default EditProjectModal
