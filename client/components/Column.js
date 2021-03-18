import React from 'react'
import {Link} from 'react-router-dom'
import TaskCard from './SingleTaskExpanded'
import ColumnDropDown from './ColumnDropDown'

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
      '<div><span style="color: red;">some red text (hopefully)</span></div>',
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
    // const {tasks} = props

    // fakeDb: remove when connected to real db
    const tasks = fakeDb

    return (
      <div className="columnContainer">
        <div className="badgeTitleDotMenu">
          <div className="inlineFlexContainer">
            <span className="columnBadge">{tasks.length}</span>
            <span className="columnTitle"></span>
          </div>
          <div className="inlineFlexContainer">
            <span className="material-icons">add</span>
            <span
              className="material-icons"
              onClick={() => this.setState({isActive: !isActive})}
            >
              more_horiz
            </span>
          </div>
          {isActive && <ColumnDropDown handleDelete={handleDelete} />}
        </div>
        <div className="cardContainer">
          {tasks.map((task) => (
            <Link to={`/tasks/${task.id}`} key={task.id}>
              <TaskCard task={task} />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default Column
