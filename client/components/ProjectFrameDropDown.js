import React, {useState} from 'react'
import DeleteProjectModal from './DeleteProjectModal'
import EditProjectModal from './EditProjectModal'

import styles from './css/ProjectFrameDropDown.module.css'

const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  {id: 3, type: 'Back'},
  // more fields as necessary
]

const ProjectFrameDropDown = ({
  project,
  organization,
  setProjects,
  closeDropDown,
}) => {
  // activeField tracks modal to display
  const [activeField, setActiveField] = useState('')

  // falsey activeField closes modal
  const closeModal = () => setActiveField('')

  return (
    <>
      <div className={styles.taskCardDropDownContainer}>
        {/* to add fields to dropdown, use fields array above */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={styles.dropDownField}
            onClick={() => {
              if (field.type === 'Back') return closeDropDown()
              setActiveField(field.type)
            }}
          >
            <span className={styles.fieldName}>{field.type}</span>
            <span className="arrow material-icons">keyboard_arrow_right</span>
          </div>
        ))}
      </div>
      <div className={styles.arrowDown}></div>
      {activeField === 'Edit' && (
        <EditProjectModal
          project={project}
          organization={organization}
          setProjects={setProjects}
          closeModal={closeModal}
        />
      )}
      {activeField === 'Delete' && (
        <DeleteProjectModal
          project={project}
          organization={organization}
          setProjects={setProjects}
          closeModal={closeModal}
        />
      )}
    </>
  )
}
export default ProjectFrameDropDown
