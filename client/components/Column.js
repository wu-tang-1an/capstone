import React from 'react'
import {Link} from 'react-router-dom'
import TaskCard from './SingleTaskExpanded'
import ColumnDropDown from './ColumnDropDown'

import styles from './Column.css'
const fakeDb = [
  {
    id: 1,
    name: 'create homepage',
    createdBy: 'Albert',
    description:
      '[] write a homepage\n[] connect to backend oauth routes\n[] write oauth tests',
    status: 'in-progress',
  },
  {
    id: 2,
    name: 'create navbar',
    createdBy: 'Sam',
    description: '### Markdown\n## is\n#cool!',
    status: 'todo',
  },
  {
    id: 3,
    name: 'create footer',
    createdBy: 'Felix',
    description:
      '<div><div style="color: red;">some red text (hopefully)</div></div>',
    status: 'done',
  },
]

class Column extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {}

  render() {
    const {isActive} = this.state
    const {handleDelete} = this
    const {name} = this.props.column || ''
    // const {tasks} = props

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
            <div
              className="material-icons"
              onClick={() => this.setState({isActive: !isActive})}
            >
              more_horiz
            </div>
          </div>
          {isActive && <ColumnDropDown handleDelete={handleDelete} />}
        </div>
        <div className={styles.cardContainer}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    )
  }
}

export default Column
