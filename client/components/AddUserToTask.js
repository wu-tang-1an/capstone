import React, {useState, useContext} from 'react'
import {addUserToTaskDB} from '../context/axiosService'
import {ColumnContext} from '../context/columnContext'
import styles from './css/AddUserToTask.module.css'

const AddUserToTask = ({users, task}) => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(0)

  const {didUpdateTask, setDidUpdateTask} = useContext(ColumnContext)

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
              color: task.users.some((user) => user.id === id)
                ? 'green'
                : 'inherit',
            }}
            onClick={async () => {
              try {
                setSelectedUserId(id)
                // add user to task db
                // find out which context we'll need to trigger a refresh in ...
                await addUserToTaskDB(id, task.id)
                setDidUpdateTask(!didUpdateTask)
              } catch (err) {
                console.error(err)
              }
            }}
          >
            <span className={styles.userName}>
              {firstName + ' ' + lastName}
            </span>
            <i className="material-icons">
              {task.users.some((user) => user.id === id) ? 'checkmark' : ''}
            </i>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddUserToTask
