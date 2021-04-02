import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import {CgOrganisation} from 'react-icons/cg'
import {IconContext} from 'react-icons'
import AddOrgDropdown from './AddOrgDropdown'
import styles from './css/AllOrgs.module.css'
import RemoveOrgModal from './RemoveOrgModal'
import {removeUserFromOrgDB, fetchUserOrgs} from '../context/axiosService'

const AllOrgs = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  // initialize all orgs state
  const [organizations, setOrganizations] = useState([])

  // fetch all orgs
  useEffect(() => {
    const fetchAllOrgs = async () => {
      try {
        const orgs = await fetchUserOrgs(user.id)
        setOrganizations(orgs)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAllOrgs()
  }, [organizations.length])

  // delete a single org and persist to local state
  const deleteOrganization = async (e, org) => {
    e.preventDefault()
    try {
      await removeUserFromOrgDB(org.id, user.id)
      setOrganizations(organizations.filter((currOrg) => currOrg.id !== org.id))
    } catch (err) {
      console.error(err)
    }
  }

  const [isModalVisible, setModalVisible] = useState(false)

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
            {organizations.map((org, idx) => (
              <div key={idx} className={styles.orgCont}>
                <div>
                  <img className={styles.orgImg} src={org.imageUrl} />
                </div>
                <div className={styles.orgNameCont}>
                  <h3 className={styles.orgName}>{org.name}</h3>
                </div>
                <div className={styles.btnContainer}>
                  <button
                    className={styles.removeBtn}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setModalVisible(true)
                    }}
                    style={{zIndex: '999'}}
                  >
                    Leave
                  </button>
                </div>
                {isModalVisible && (
                  <RemoveOrgModal deleteOrganization={deleteOrganization} />
                )}
              </div>
            ))}
            <AddOrgDropdown
              organizations={organizations}
              setOrganizations={setOrganizations}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AllOrgs
