import React from 'react'
import {connect} from 'react-redux'
import Column from './Column'
import AddButton from './AddButton'
import styles from './Board.css'

class Board extends React.Component {
  // const {columns} = props

  // fakeDb, remove when connected to real db

  render() {
    const {columns} = this.props
    return (
      <div className="Board">
        <div className={styles.boardContainer}>
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
          <AddButton column />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  columns: state.columns,
})

export default connect(mapStateToProps)(Board)
