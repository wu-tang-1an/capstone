import React, {useState, useContext, useEffect} from 'react'
import AddOrganizationDialog from './AddOrganizationDialog'
import Modal from './Modal'
import LeaveOrgModal from './LeaveOrgModal'
import Invitations from './Invitations'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import InvitationProvider, {
  InvitationContext,
} from '../context/invitationContext'
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
          <img src={imageUrl} className={styles.allOrgsImg} />
          <div className={styles.orgName}>{name}</div>
          <div className={styles.numMembers}>{`${numMembers} members`}</div>
        </div>
      </Link>
      <button
        className={styles.leaveOrgBtn}
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

  // grab invitations and setter from invitation context
  const {invitations, setInvitations} = useContext(InvitationContext)

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
  }, [invitations])

  // delete a single org and persist to local state
  const leaveOrg = async (orgId) => {
    try {
      await removeUserFromOrgDB(orgId, user.id)
      setOrganizations(organizations.filter((org) => org.id !== orgId))
    } catch (err) {
      console.error(err)
    }
  }

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
      <div className={styles.leftPanel}>
        <Invitations
          invitations={invitations}
          setInvitations={setInvitations}
          organizations={organizations}
          setOrganizations={setOrganizations}
        />
      </div>

      <div className={styles.headerAndOrgs}>
        <div className={styles.headerAndCreateBtn}>
          <div className={styles.sectionHeader}>My Organizations</div>
          <AddOrganizationDialog
            organizations={organizations}
            setOrganizations={setOrganizations}
          />
        </div>

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

const WrappedOrgs = () => (
  <InvitationProvider>
    <AllOrgs />
  </InvitationProvider>
)

export default WrappedOrgs
