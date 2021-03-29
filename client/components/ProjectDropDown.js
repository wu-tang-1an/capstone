import React, {useState} from 'react'
import Modal from './Modal'
import styles from './css/ColumnDropDown.css'

const ProjectDropDown = ({project}) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false)

  const closeDropDown = () => setIsDropDownActive(false)

  return (
    <div>
      <div
        className="material-icons"
        onClick={() => setIsDropDownActive(!isDropDownActive)}
      >
        more_horiz
      </div>
      {isDropDownActive && (
        <DropDownCont project={project} closeDropDown={closeDropDown} />
      )}
    </div>
  )
}

// fields are actions that user can take from dropdown menu
const fields = [
  {id: 1, content: 'Edit project'},
  {id: 3, content: 'Delete project'},
  // more fields as necessary
]

const DropDownCont = ({project, closeDropDown}) => {
  const [currentField, setCurrentField] = useState('')

  return (
    <div className={styles.columnDropDownContainer}>
      {fields.map((field) => (
        // onClick, reveal a dropdown with clickable links for each field
        <div
          key={field.id}
          className={styles.dropDownField}
          onClick={() => setCurrentField(field.content)}
        >
          <span className={styles.fieldName}>{field.content}</span>
          <span className="material-icons">keyboard_arrow_right</span>
        </div>
      ))}
      {/* delete modal */}
      {currentField === 'Delete project' && (
        <Modal>
          <div className={styles.modalContent}>
            <div className={styles.deleteMessage}>
              <strong>Warning!</strong> This action will delete the selected
              column and <strong>all cards associated with it.</strong>
              <br /> Press <span>Delete column</span> to continue, or cancel to
              go back.
            </div>
            <div className={styles.modalBtnsContainer}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => {}}
              >
                Delete Column
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={closeDropDown}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      {currentField === 'Edit project' && (
        <Modal>
          <div className={styles.modalContent}>
            <div className={styles.newColumnName}>New project name</div>
            <input
              type="text"
              className={styles.columnNameInput}
              onChange={() => {}}
            />
            <div className={styles.modalBtnsContainer}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => {
                  closeDropDown()
                }}
              >
                Save
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={closeDropDown}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
export default ProjectDropDown
