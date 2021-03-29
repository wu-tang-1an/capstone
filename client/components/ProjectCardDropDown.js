import React, {useState} from 'react'
import axios from 'axios'
import Modal from './Modal'
import styles from './css/TaskCardDropDown.css'
import DeleteProjectModal from './DeleteProjectModal'

const fields = [
  {id: 1, type: 'Edit'},
  {id: 2, type: 'Delete'},
  // more fields as necessary
]

const ProjectCardDropDown = ({project, setOrganization}) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false)

  const closeDropDown = () => setIsDropDownActive(false)

  return (
    <div>
      {isDropDownActive && (
        <DropDownContainer
          project={project}
          setOrganization={setOrganization}
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

const DropDownContainer = ({project, setOrganization, closeDropDown}) => {
  const [activeField, setActiveField] = useState('')

  const closeModal = () => setActiveField('')

  const deleteProject = async () => {
    try {
      // delete project from db
      await axios.delete(`/api/projects/${project.id}`)

      // const {data} = await axios.get(`/api/`)
      // setOrganization(data)
    } catch (err) {
      console.error(err)
    }
    closeModal()
  }

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
        <Modal>
          <DeleteProjectModal
            deleteProject={deleteProject}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </div>
  )
}
export default ProjectCardDropDown
