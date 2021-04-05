import React, {useState} from 'react'
import EditProjectModal from './EditProjectModal'
import DeleteProjectModal from './DeleteProjectModal'
import styles from './css/ProjectFrameDropDown.module.css'

const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  {id: 3, type: 'Close'},
  // more fields as necessary
]

const ProjectFrameDropDown = ({
  organization,
  project,
  setProjects,
  closeDropDown,
}) => {
  // activeField tracks modal to display
  const [activeField, setActiveField] = useState('')

  // isHiddenDropDown allows us to hide the drop down when modal is visible
  const [isHiddenDropDown, setHiddenDropDown] = useState(false)

  // falsey activeField closes modal
  const closeModal = () => {
    setActiveField('')
    closeDropDown()
  }

  return (
    <>
      {activeField === 'Edit' && (
        <EditProjectModal
          organization={organization}
          project={project}
          setProjects={setProjects}
          closeModal={closeModal}
        />
      )}
      {activeField === 'Delete' && (
        <DeleteProjectModal
          organization={organization}
          project={project}
          setProjects={setProjects}
          closeModal={closeModal}
        />
      )}
      <div
        className={
          isHiddenDropDown ? styles.dropDownParentHidden : styles.dropDownParent
        }
      >
        <div className={styles.taskCardDropDownContainer}>
          {/* to add fields to dropdown, use fields array above */}
          {fields.map((field) => (
            <div
              key={field.id}
              className={styles.dropDownField}
              onClick={() => {
                if (field.type === 'Back') return closeDropDown()
                setActiveField(field.type)
                setHiddenDropDown(true)
              }}
            >
              <span className={styles.fieldName}>{field.type}</span>
              <span className="arrow material-icons">keyboard_arrow_right</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default ProjectFrameDropDown
