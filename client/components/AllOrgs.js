import React from 'react'
import {connect} from 'react-redux'

import {fetchOrgs, resetState} from '../store/organizations'
import styles from './AllOrgs.css'

function mapState(state) {
  return {
    organizations: state.organizations,
    userId: state.singleUser.id,
  }
}

function mapDispatch(dispatch) {
  return {
    fetchOrgs: (userId) => dispatch(fetchOrgs(userId)),
    resetState: () => dispatch(resetState()),
  }
}

class AllOrgs extends React.Component {
  componentDidMount() {
    this.props.fetchOrgs(this.props.userId)
  }
  componentWillUnmount() {
    this.props.resetState()
  }

  render() {
    console.log('this s the state ', this.props)
    return (
      <div className={styles.allOrgsCont}>
        {this.props.organizations.map((org, index) => {
          return (
            <div key={index} className={styles.orgCont}>
              <div>
                <img className={styles.orgImg} src={org.imageUrl} />
              </div>

              <div className={styles.orgNameCont}>
                <h3>{org.name}</h3>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AllOrgs)
