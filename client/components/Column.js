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
    name: 'create homepage',
    createdBy: 'Sam',
    description: '### Markdown\n## is\n#cool!',
    status: 'todo',
  },
  {
    id: 3,
    name: 'create homepage',
    createdBy: 'Felix',
    description:
      '<div><span style="color: red;">some red text (hopefully)</span></div>',
    status: 'done',
  },
]

const Column = (props) => {
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
          <span className="material-icons">more_horiz</span>
        </div>
        <ColumnDropDown />
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

export default Column
