import React, {useState} from 'react'
import styles from './css/AddUserToTask.module.css'

const AddUserToTask = ({users}) => {
  const [selected, setSelected] = useState('')

  return (
    <div className={styles.addUserDialog}>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {users.map(({id, firstName, lastName}) => (
          <option key={id}>{firstName + ' ' + lastName}</option>
        ))}
      </select>
    </div>
  )
}

export default AddUserToTask
