import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import styles from './css/AllOrgs.css'

const AllOrgs = (props) => {
  const [organizations, setOrganizations] = useState([])

  const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    const setOrgs = () => {
      setOrganizations(user.organizations)
    }
    setOrgs()
  }, [organizations])

  return (
    <div>
      {organizations && (
        <div>
          <h1 className={styles.allOrgsHeader}>Your Organizations</h1>
          <div className={styles.allOrgsCont}>
            {organizations.map((org, index) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AllOrgs
