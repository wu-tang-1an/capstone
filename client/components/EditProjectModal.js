import React, {useState} from 'react'
import Modal from './Modal'
import styles from './css/ColumnDropDown.css'

const EditProjectModal = ({project, closeModal}) => {
  const [name, setName] = useState(project.name)

  return (
    <Modal>
      <div className={styles.modalContent}>
        <div className={styles.newColumnName}>New column name</div>
        <input
          type="text"
          className={styles.columnNameInput}
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
