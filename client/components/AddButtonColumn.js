import React from 'react'
import {Card, Icon, Button} from '@material-ui/core'
import Textarea from 'react-textarea-autosize'
import {fetchAddColumn, addColumn} from '../store/columns'
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
      name: e.target.value,
    })
  }

  handleAddColumn(e) {
    e.preventDefault()
    console.log('deeee', this.props)
    this.props.addColumn({
      ...this.state,
    })
  }

  render() {
    console.log('this.props--->', this.props)
    const renderAddButton = () => {
      return (
        <div
          onClick={this.openForm}
          style={{
            ...styles.openForButtonGroup,
            opacity: 1,
            color: 'white',
            background: 'rgba(0,0,0,.15)',
          }}
        >
          <Icon> add </Icon>
          <p> 'Add Column' </p>{' '}
        </div>
      )
    }

    const renderForm = () => {
      const placeholder = 'Enter a title for Column'

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
              'Add Column'
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
