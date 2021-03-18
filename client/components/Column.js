import React from 'react'
import {Link} from 'react-router-dom'
import TaskCard from './SingleTaskExpanded'

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
      <div className="titleAndDotMenu">
        <span className="columnTitle"></span>
        <span className="material-icons">more_horiz</span>
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
