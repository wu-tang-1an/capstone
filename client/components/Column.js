import React, {useState} from 'react'
import {connect} from 'react-redux'
import TaskCard from './TaskCard'
import ColumnDropDown from './ColumnDropDown'
import {fetchAllTasks} from '../store/tasks'
import AddButton from './AddButton'
import {ItemTypes} from './DragConstants'

const fakeDb = [
  {
    id: 1,
    name: 'create homepage',
    createdBy: 'Albert',
    createdAt: String(Date.now() - 2),
    description:
      '[] write a homepage\n[] connect to backend oauth routes\n[] write oauth tests',
    status: 'in-progress',
    user: {
      id: 1,
      name: 'Albert',
      imageUrl: 'https://i.imgur.com/ZoKHJRz.jpg',
    },
  },
  {
    id: 2,
    name: 'create navbar',
    createdBy: 'Sam',
    createdAt: String(Date.now() - 4),
    description: '### Markdown\n## is\n#cool!',
    status: 'todo',
    user: {
      id: 2,
      name: 'Sam',
      imageUrl: 'https://i.imgur.com/TUsXHrj.jpg',
    },
  },
  {
    id: 3,
    name: 'create footer',
    createdBy: 'Felix',
    createdAt: String(Date.now() - 5),
    description:
      '<div><div style="color: red;">some red text (hopefully)</div></div>',
    status: 'done',
    user: {
      id: 3,
      name: 'Felix',
      imageUrl: 'https://i.imgur.com/7nMCKHE.jpg',
    },
  },
]

const moveTaskCard = (columnName) => {}

import styles from './Column.css'
const Column = (props) => {
  const [isActive, setActive] = useState(false)

  const {name} = props.column || ''
  // const {tasks} = props
  // const columnTasks = tasks.filter(task => task.status === name)

  // fakeDb: remove when connected to real db
  const tasks = fakeDb

  return (
    <div className={styles.columnContainer}>
      <div className={styles.badgeTitleDotMenu}>
        <div className={styles.badgeAndTitle}>
          <div className={styles.columnBadge}>{tasks.length}</div>
          <div className={styles.columnTitle}>{name}</div>
        </div>
        <div className={styles.newTaskAndMoreOpts}>
          {/* material-icons is delivered from index.html with every route -- we can simply use "material-icons" className whenever we want to render an icon */}
          <div className="material-icons">add</div>
          <div className="material-icons" onClick={() => setActive(!isActive)}>
            more_horiz
          </div>
        </div>
        {isActive && <ColumnDropDown />}
      </div>
      <div className={styles.cardContainer}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <AddButton />
      </div>
    </div>
  )
}

const mapState = (state) => ({
  tasks: state.tasks,
})

const mapDispatch = (dispatch) => ({
  getAllTasks: () => dispatch(fetchAllTasks()),
})

export default connect(mapState, mapDispatch)(Column)
