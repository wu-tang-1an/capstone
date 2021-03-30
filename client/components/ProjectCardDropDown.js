import React, {useState} from 'react'
import DeleteProjectModal from './DeleteProjectModal'
import EditProjectModal from './EditProjectModal'

import styles from './css/TaskCardDropDown.css'

const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  // more fields as necessary
]

const ProjectCardDropDown = ({project, organization, setProjects}) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false)

  const closeDropDown = () => setIsDropDownActive(false)

  return (
    <div>
      {isDropDownActive && (
        <DropDownContainer
          project={project}
          organization={organization}
          setProjects={setProjects}
          closeDropDown={closeDropDown}
        />
      )}
      <div
        className="material-icons"
        onClick={() => setIsDropDownActive(!isDropDownActive)}
      >
        more_horiz
      </div>
    </div>
  )
}

const DropDownContainer = ({
  project,
  organization,
  setProjects,
  closeDropDown,
}) => {
  const [activeField, setActiveField] = useState('')

  const closeModal = () => setActiveField('')

  return (
    <div>
      <div className={styles.taskCardDropDownContainer}>
        {/* to add fields to dropdown, use fields array above */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={styles.dropDownField}
            onClick={() => setActiveField(field.type)}
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
    </div>
  )
}
export default ProjectCardDropDown
