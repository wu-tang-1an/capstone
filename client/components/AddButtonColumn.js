import React from 'react'
import {Card, Icon, Button} from '@material-ui/core'
import Textarea from 'react-textarea-autosize'
import {
  fetchAddColumn,
  fetchAddTask,
  addColumn,
  addTask,
} from '../store/columns'
import {connect} from 'react-redux'

export class AddButtonColumn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formOpen: false,
      name: '',
    }
    this.openForm = this.openForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  openForm() {
    this.setState({
      formOpen: true,
    })
  }

  closeForm() {
    this.setState({
      formOpen: false,
    })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  async handleAddColumn(e) {
    e.preventDefault()
    await this.props.addColumn({
      ...this.state,
    })
  }

  render() {
    const renderAddButton = () => {
      const buttonText = 'Add Column'
      const buttonTextOpacity = 1
      const buttonTextColor = 'white'
      const buttonTextBackground = 'rgba(0,0,0,.15)'

      return (
        <div
          onClick={this.openForm}
          style={{
            ...styles.openForButtonGroup,
            opacity: buttonTextOpacity,
            color: buttonTextColor,
            background: buttonTextBackground,
          }}
        >
          <Icon> add </Icon> <p> {buttonText} </p>{' '}
        </div>
      )
    }

    const renderForm = () => {
      const placeholder = 'Enter a title for Column'
      const buttonTitle = 'Add Column'

      return (
        <div>
          <Card
            style={{
              overflow: 'visible',
              minHeight: 80,
              minWidth: 272,
              padding: '6px 8px 2px',
            }}
          >
            <Textarea
              placeholder={placeholder}
              autoFocus
              onBlur={this.closeForm}
              value={this.state.name}
              onChange={this.handleInputChange}
              style={{
                resize: 'none',
                width: '100%',
                outline: 'none',
                border: 'none',
              }}
            />{' '}
          </Card>{' '}
          <div style={styles.formButtonGroup}>
            <Button
              onMouseDown={this.handleAddColumn}
              variant="contained"
              style={{
                color: 'white',
                backgroundColor: '#5aac44',
              }}
            >
              {' '}
              {buttonTitle}{' '}
            </Button>{' '}
            <Button
              variant="contained"
              style={{
                color: 'white',
                backgroundColor: 'red',
              }}
            >
              {' '}
              {'Cancel'}{' '}
            </Button>{' '}
          </div>{' '}
        </div>
      )
    }

    return this.state.formOpen ? renderForm() : renderAddButton()
  }
}

const mapState = (state) => {
  return {
    columns: state.columns,
  }
}

const mapDispatch = (dispatch) => {
  return {
    addColumn: (name) => {
      return dispatch(fetchAddColumn(name))
    },
  }
}

export default connect(mapState, mapDispatch)(AddButtonColumn)
