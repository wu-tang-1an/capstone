import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import styles from './css/AllOrgs.css'

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

const AllOrgs = (props) => {
  const [organizations, setOrganizations] = useState([])

  const {user, setUser} = useContext(AuthContext)

  console.log('user in AllOrgs is: ', user)

  useEffect(() => {
    const setOrgs = () => {
      setOrganizations(user.organizations)
    }
    setOrgs()
  }, [organizations])

  return (
    <div>
      <h1 className={styles.allOrgsHeader}>Your Organizations</h1>
      <div className={styles.allOrgsCont}>
        {organizations.map((org, index) => {
          return (
            <Link
              key={index}
              className={styles.allOrgsAnchor}
              to={`/organizations/${org.id}`}
            >
              <div className={styles.orgCont}>
                <div>
                  <img className={styles.orgImg} src={org.imageUrl} />
                </div>

                <div className={styles.orgNameCont}>
                  <h3 className={styles.orgName}>{org.name}</h3>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AllOrgs
