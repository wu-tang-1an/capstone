import React from 'react'
import {fetchUpdateUser} from '../store/users'
import {connect} from 'react-redux'

export class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        password: this.props.user.password
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        password: this.props.user.password
      })
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit() {
    await this.props.fetchUpdateUser({
      ...this.props.user,
      ...this.state
    })
  }
  render() {
    return (
      <div>
        <h1>Update Profile</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName || ''}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName || ''}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={this.state.email || ''}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div>
              <label>
                Password:
                <input
                  name="password"
                  type="password"
                  value={this.state.password || ''}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {user: state.user}
}
const mapDispatch = dispatch => {
  return {
    updateUser: state => {
      return dispatch(fetchUpdateUser(state))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdateUser)
