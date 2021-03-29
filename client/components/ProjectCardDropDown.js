import React, {useState} from 'react'
import styles from './css/TaskCardDropDown.css'
import DeleteProjectModal from './DeleteProjectModal'
// import {deleteProjectDb, getOrgDb} from '../context/axiosService'

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

  const handleSelectOption = (option) => {
    // handle 'Delete' selection
    if (option === 'Delete') return setActiveField(option)

    // otherwise, handle 'Edit' selection
    setActiveField(option)
  }

  return (
    <div>
      <div className={styles.taskCardDropDownContainer}>
        {/* to add fields to dropdown, use fields array above */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={styles.dropDownField}
            onClick={() => handleSelectOption(field.type)}
          >
            <span className={styles.fieldName}>{field.type}</span>
            <span className="arrow material-icons">keyboard_arrow_right</span>
          </div>
        ))}
      </div>
      <div className={styles.arrowDown}></div>
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
