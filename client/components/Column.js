import React from 'react'
import TaskCard from './TaskCard'

const Column = (props) => {
  const {cards} = props
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
