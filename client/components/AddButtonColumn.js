import React from 'react'
import {Card, Icon, Button} from '@material-ui/core'
import Textarea from 'react-textarea-autosize'
import {fetchAddColumn} from '../store/columns'
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
  state = {
    formOpen: false,
    name: '',
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
      name: e.target.value,
    })
  }

  handleAddColumn = () => {
    const {dispatch} = this.props
    const {name} = this.state
    console.log('name--->', name)

    if (name) {
      dispatch(fetchAddColumn(name)).then(() => {
        this.setState({
          name: '',
        })
      })
    }
  }

  renderAddButton = () => {
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
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    )
  }

  renderForm = () => {
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

const mapState = (state) => {
  return {
    columns: state.columns,
  }
}

export default connect(mapState)(AddButtonColumn)
