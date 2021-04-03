import React, {useState, useContext, useEffect} from 'react'
import Modal from './Modal'
import LeaveOrgModal from './LeaveOrgModal'
import Invitations from './Invitations'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import styles from './css/AllOrgs.module.css'
import {fetchUserOrgs, removeUserFromOrgDB} from '../context/axiosService'

const OrganizationCard = ({
  orgId,
  name,
  numMembers,
  imageUrl,
  setModalVisible,
  setOrgIdForDelete,
}) => {
  return (
    <div className={styles.orgCardContainer}>
      <Link to={`/organizations/${orgId}`}>
        <div className={styles.imgAndOrgName}>
          <img src={imageUrl} />
          <div className={styles.orgName}>{name}</div>
          <div className={styles.numMembers}>{`${numMembers} members`}</div>
        </div>
      </Link>
      <button
        className={styles.openModalBtn}
        type="button"
        onClick={() => {
          setOrgIdForDelete(orgId)
          setModalVisible(true)
        }}
      >
        Leave Organization
      </button>
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
  const leaveOrg = async (orgId) => {
    try {
      await removeUserFromOrgDB(orgId, user.id)
    } catch (err) {
      console.error(err)
    }
  }

  // setOrganizations(organizations.filter((org) => org.id !== orgId))

  const [isModalVisible, setModalVisible] = useState(false)
  const [orgIdForDelete, setOrgIdForDelete] = useState(0)

  return (
    <div className={styles.wrapper}>
      {isModalVisible && (
        <Modal>
          <LeaveOrgModal
            leaveOrg={leaveOrg}
            orgIdForDelete={orgIdForDelete}
            organizations={organizations}
            setOrganizations={setOrganizations}
            closeModal={() => setModalVisible(false)}
          />
        </Modal>
      )}
      <div className={styles.invitationsContainer}>
        <Invitations
          organizations={organizations}
          setOrganizations={setOrganizations}
        />
      </div>
      <div className={styles.headerAndOrgs}>
        <div className={styles.sectionHeader}>My Organizations</div>
        <div className={styles.allOrgsContainer}>
          {organizations.map((org) => (
            <OrganizationCard
              key={org.id}
              userId={user.id}
              orgId={org.id}
              name={org.name}
              imageUrl={org.imageUrl}
              numMembers={org && org.users ? org.users.length : 0}
              setModalVisible={setModalVisible}
              setOrgIdForDelete={setOrgIdForDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllOrgs
