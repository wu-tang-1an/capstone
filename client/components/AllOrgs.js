import React, {useState, useContext, useEffect} from 'react'
import AddOrganizationDialog from './AddOrganizationDialog'
import Modal from './Modal'
import LeaveOrgModal from './LeaveOrgModal'
import EditOrgModal from './EditOrgModal'
import DeleteOrgModal from './DeleteOrgModal'
import Invitations from './Invitations'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import InvitationProvider, {
  InvitationContext,
} from '../context/invitationContext'
import {notify} from './helper/toast'
import styles from './css/AllOrgs.module.css'
import {
  fetchUserOrgs,
  removeUserFromOrgDB,
  editOrganizationDB,
  deleteOrganizationDB,
} from '../context/axiosService'

const OrganizationCard = ({
  userId,
  organization,
  numMembers,
  setCurrentOrgId,
  setActiveField,
}) => {
  const {name, imageUrl} = organization
  const orgId = organization.id

  // only organization admins can edit, delete orgs
  const isOrgAdmin =
    organization.users.find((member) => member.id === userId).user_organization
      .role === 'admin'

  return (
    <div className={styles.orgCardContainer}>
      <Link to={`/organizations/${orgId}`}>
        <div className={styles.imgAndOrgName}>
          <img src={imageUrl} className={styles.allOrgsImg} />
          <div className={styles.orgName}>{name}</div>
          <div className={styles.numMembers}>{`${numMembers} members`}</div>
        </div>
      </Link>
      <div className={styles.orgBtnsContainer}>
        <button
          className={styles.modifyOrgBtn}
          type="button"
          onClick={() => {
            setCurrentOrgId(orgId)
            setActiveField('leaveOrg')
          }}
        >
          Leave
        </button>
        {/* only show edit, delete btns if auth user is admin of organization */}
        {isOrgAdmin && (
          <div className={styles.editAndDelete}>
            <span
              className={styles.editBtn}
              onClick={() => {
                setCurrentOrgId(orgId)
                setActiveField('editOrg')
              }}
            >
              edit
            </span>
            <span className={styles.divider}>|</span>
            <span
              className={styles.deleteBtn}
              onClick={() => {
                setCurrentOrgId(orgId)
                setActiveField('deleteOrg')
              }}
            >
              delete
            </span>
          </div>
        )}
      </div>
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
  const [orgWasEdited, setOrgWasEdited] = useState(false)

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
  }, [invitations, orgWasEdited])

  // delete a single org and persist to local state
  const leaveOrg = async (orgId) => {
    try {
      await removeUserFromOrgDB(orgId, user.id)
      setOrganizations(organizations.filter((org) => org.id !== orgId))
    } catch (err) {
      console.error(err)
    }
  }

  // edit a single org and persist to local state
  const editOrg = async (orgId, updateInfo) => {
    try {
      const editedOrg = await editOrganizationDB(orgId, updateInfo)
      setOrgWasEdited(true)
      setOrganizations(
        organizations.map((org) => (org.id === editedOrg.id ? editedOrg : org))
      )
      setOrgWasEdited(false)
    } catch (err) {
      console.error(err)
    }
  }

  // delete a single org and persist to local state
  const deleteOrg = async (orgForDelete) => {
    try {
      await deleteOrganizationDB(orgForDelete.id)
      setOrganizations(
        organizations.filter((org) => org.id !== orgForDelete.id)
      )
      notify(`Organization successfully deleted!`, 'warning')
    } catch (err) {
      console.error(err)
    }
  }

  // local state for modals
  const [activeField, setActiveField] = useState('')
  const [currentOrgId, setCurrentOrgId] = useState(0)

  return (
    <div className={styles.wrapper}>
      {activeField === 'leaveOrg' && (
        <Modal>
          <LeaveOrgModal
            leaveOrg={leaveOrg}
            currentOrgId={currentOrgId}
            organizations={organizations}
            closeModal={() => setActiveField('')}
          />
        </Modal>
      )}
      {activeField === 'editOrg' && (
        <Modal>
          <EditOrgModal
            editOrg={editOrg}
            currentOrgId={currentOrgId}
            organizations={organizations}
            closeModal={() => setActiveField('')}
          />
        </Modal>
      )}
      {activeField === 'deleteOrg' && (
        <Modal>
          <DeleteOrgModal
            deleteOrg={deleteOrg}
            currentOrgId={currentOrgId}
            organizations={organizations}
            closeModal={() => setActiveField('')}
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
              organization={org}
              numMembers={org && org.users ? org.users.length : 0}
              setCurrentOrgId={setCurrentOrgId}
              setActiveField={setActiveField}
              setOrganizations={setOrganizations}
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
