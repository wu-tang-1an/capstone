import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import {CgOrganisation} from 'react-icons/cg'
import {IconContext} from 'react-icons'
import AddOrgDropdown from './AddOrgDropdown'
import styles from './css/AllOrgs.module.css'

const AllOrgs = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize all orgs state
  const [organizations, setOrganizations] = useState([])

  const [organization, setDeleteOrganization] = useState({})

  const fetchAllOrgs = async () => {
    try {
      const {data} = await axios.get(`/api/users/${user.id}/organizations`)
      setOrganizations(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    let isMounted = true

    fetchAllOrgs()

    return () => {
      isMounted = false
    }
  }, [])

  if (user.status === 'admin') {
    return (
      <div>
        {organizations && (
          <div>
            <div className={styles.headerCont}>
              <h1 className={styles.allOrgsHeader}>Your Organizations</h1>

              <IconContext.Provider
                value={{size: '2rem', style: {marginTop: '0.7rem'}}}
              >
                <CgOrganisation />
              </IconContext.Provider>
            </div>

            <div className={styles.allOrgsCont}>
              {organizations.map((org) => (
                <Link
                  key={org.id}
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
                    <div onSubmit={(event) => event.preventDefault()}>
                      <button
                        type="button"
                        onClick={() => {
                          // this.props.removeSingleStudent(student)
                          // fetchAllOrgs()
                        }}
                      >
                        X
                      </button>
                    </div>
                    <div onSubmit={(event) => event.preventDefault()}>
                      <button
                        type="button"
                        onClick={() => {
                          // this.props.removeSingleStudent(student)
                          // fetchAllOrgs()
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
              <AddOrgDropdown />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {organizations && (
        <div>
          <div className={styles.headerCont}>
            <h1 className={styles.allOrgsHeader}>Your Organizations</h1>

            <IconContext.Provider
              value={{size: '2rem', style: {marginTop: '0.7rem'}}}
            >
              <CgOrganisation />
            </IconContext.Provider>
          </div>

          <div className={styles.allOrgsCont}>
            {organizations.map((org) => (
              <Link
                key={org.id}
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
