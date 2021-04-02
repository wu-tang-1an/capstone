import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import styles from './css/AllOrgs.module.css'
import {fetchUserOrgs, removeUserFromOrgDB} from '../context/axiosService'

const OrganizationCard = ({orgId, name, imageUrl, setModalVisible}) => {
  return (
    <div className={styles.orgCardContainer}>
      <Link to={`/organizations/${orgId}`}>
        <div className={styles.imgAndOrgName}>
          <img src={imageUrl} />
          <div className={styles.orgName}>{name}</div>
        </div>
      </Link>
      <button
        className={styles.openModalBtn}
        type="button"
        onClick={() => setModalVisible(true)}
        value="Leave"
        style={{zIndex: '999'}}
      />
    </div>
  )
}

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
  const leaveOrg = async (e, orgId) => {
    e.preventDefault()
    try {
      await removeUserFromOrgDB(orgId, user.id)
      setOrganizations(organizations.filter((org) => org.id !== orgId))
    } catch (err) {
      console.error(err)
    }
  }

  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <React.Fragment>
      {isModalVisible && <LeaveOrgModal leaveOrg={leaveOrg} />}
      <div className={styles.allOrgsContainer}>
        {organizations.map((org) => (
          <OrganizationCard
            key={org.id}
            userId={user.id}
            orgId={org.id}
            name={org.name}
            imageUrl={org.imageUrl}
            setModalVisible={setModalVisible}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default AllOrgs
