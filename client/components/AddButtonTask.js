import React from 'react'
import {Card, Icon, Button} from '@material-ui/core'
import Textarea from 'react-textarea-autosize'
import {fetchAddTask} from '../store/columns'
import {connect} from 'react-redux'

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

export class AddButtonTask extends React.Component {
  state = {
    formOpen: false,
    description: '',
  }

  openForm = () => {
    this.setState({
      formOpen: true,
    })
  }

  closeForm = () => {
    this.setState({
      formOpen: false,
    })
  }

  handleInputChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  handleAddTask = () => {
    const {dispatch, columnId} = this.props
    const {description} = this.state
    console.log('description--->', description)
    console.log('columnId--->', columnId)
    console.log('this.state--->', this.state)
    console.log('this.propsinHandle--->', this.props)

    if (name) {
      dispatch(fetchAddTask(columnId, description)).then(() => {
        this.setState({
          description: '',
        })
      })
    }
  }

  renderAddButton = () => {
    const buttonText = 'Add Task'
    const buttonTextOpacity = 0.5
    const buttonTextColor = 'inherit'
    const buttonTextBackground = 'inherit'

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
    const placeholder = 'Enter a title for Task'
    const buttonTitle = 'Add Task'

    console.log('this.props--->', this.props)

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
            value={this.state.description}
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
            onMouseDown={this.handleAddTask}
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

const mapState = (state) => {
  return {
    tasks: state.tasks,
    columns: state.columns,
  }
}

export default connect(mapState)(AddButtonTask)
