import React, {useState, useContext} from 'react'
import {addUserToTaskDB, removeUserFromTaskDB} from '../context/axiosService'
import {ProjectContext} from '../context/projectContext'
import styles from './css/AddUserToTask.module.css'

const AddUserToTask = ({users, task}) => {
  // toggle drop down
  const [isMenuVisible, setMenuVisible] = useState(false)

  // grab flag from project context to trigger renders
  const {taskChanged, setTaskChanged} = useContext(ProjectContext)

  // initialize local state for updates
  const [assignees, setAssignees] = useState(task.users)

  console.log(assignees)

  return (
    <div className={styles.addUserDialog}>
      <div
        className={styles.menuHeader}
        onClick={() => setMenuVisible(!isMenuVisible)}
      >
        <span>Assigned:</span>
        <i className="material-icons">
          {isMenuVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
        </i>
      </div>
      <div
        className={
          isMenuVisible ? styles.menuContainer : styles.menuContainerHidden
        }
      >
        {users.map(({id, firstName, lastName}) => (
          <div
            key={id}
            className={styles.menuItem}
            style={{
              color: assignees.some((user) => user.id === id)
                ? 'green'
                : 'inherit',
            }}
            onClick={async () => {
              if (assignees.some((assignee) => assignee.id === id)) {
                await removeUserFromTaskDB(id, task.id)
                setTaskChanged(!taskChanged)
                setAssignees(assignees.filter((assignee) => assignee.id !== id))
                return
              }
              await addUserToTaskDB(id, task.id)
              setTaskChanged(!taskChanged)
              setAssignees([...assignees, users.find((user) => user.id === id)])
            }}
          >
            <span className={styles.userName}>
              {firstName + ' ' + lastName}
            </span>
            <i className="material-icons">
              {assignees.some((user) => user.id === id) ? 'checkmark' : ''}
            </i>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddUserToTask
