import React from 'react'
import {Card, Icon, Button} from '@material-ui/core'
import Textarea from 'react-textarea-autosize'
import {addColumn} from '../store/columns'
import {connect} from 'react-redux'

export class AddButton extends React.Component {
  state = {
    formOpen: false,
    name: '',
  }

  openForm = () => {
    this.setState({
      formOpen: true,
    })
  }

  closeForm = (e) => {
    this.setState({
      formOpen: false,
    })
  }

  handleInputChange = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  handleAddColumn = () => {
    const {dispatch} = this.props
    const {name} = this.state

    if (name) {
      return dispatch(addColumn(name))
    }
  }

  renderAddButton = () => {
    const {column} = this.props

    const buttonText = column ? 'Add a column' : 'Add a task'
    const buttonTextOpacity = column ? 1 : 0.5
    const buttonTextColor = column ? 'white' : 'inherit'
    const buttonTextBackground = column ? 'rgba(0,0,0,.15)' : 'inherit'

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
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    )
  }

  renderForm = () => {
    const {column} = this.props

    const placeholder = column
      ? 'Enter a title for Column'
      : 'Enter a title for Task'

    const buttonTitle = column ? 'Add Column' : 'Add Task'

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
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={this.handleAddColumn}
            variant="contained"
            style={{
              color: 'white',
              backgroundColor: '#5aac44',
            }}
          >
            {buttonTitle}{' '}
          </Button>
          <Button
            variant="contained"
            style={{
              color: 'white',
              backgroundColor: 'red',
            }}
          >
            {'Cancel'}
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton()
  }
}

const styles = {
  openForButtonGroup: {
    display: 'flex',
    alginItems: 'center',
    cursor: 'pointer',
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
  formButtonGroup: {
    marginTop: 8,
    display: 'flex',
    alginItems: 'center',
  },
}

export default connect()(AddButton)
