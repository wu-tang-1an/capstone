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

  // closeModal clears activeField
  // used by RemoveOrg modal
  const [show, setShow] = useState(false)

  const closeModalHandler = () => setShow(false)

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
              <Link
                key={idx}
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
                  <div className={styles.btnContainer}>
                    <div onClick={closeModalHandler}></div>
                    <button
                      className={styles.removeBtn}
                      type="button"
                      onClick={() => setShow(true)}
                      style={{zIndex: '10'}}
                    >
                      Leave
                    </button>
                    {show && (
                      <RemoveOrgModal
                        org={org}
                        show={show}
                        deleteOrganization={deleteOrganization}
                        closeModalHandler={closeModalHandler}
                      />
                    )}
                  </div>
                </div>
              </Link>
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
