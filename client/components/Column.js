import React from 'react'
import TaskCard from './SingleTaskExpanded'

const fakeDb = [
  {
    name: 'create homepage',
    createdBy: 'Albert',
    description:
      '[] write a homepage\n[] connect to backend oauth routes\n[] write oauth tests',
    status: 'in-progress',
  },
  {
    name: 'create homepage',
    createdBy: 'Sam',
    description: '### Markdown\n## is\n#cool!',
    status: 'todo',
  },
  {
    name: 'create homepage',
    createdBy: 'Felix',
    description:
      '<div><span style="color: red;">some red text (hopefully)</span></div>',
    status: 'done',
  },
]

const Column = (props) => {
  // const {cards} = props

  // fakeDb: remove when connected to real db
  const cards = fakeDb

  return (
    <div className="columnContainer">
      <div className="titleAndDotMenu">
        <span className="columnTitle"></span>
        <span className="material-icons">more_horiz</span>
      </div>
      <div className="cardContainer">
        {cards.map((card, idx) => (
          <TaskCard key={idx} card={card} />
        ))}
      </div>
    </div>
  )
}

export default Column
