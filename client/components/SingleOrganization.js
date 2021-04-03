import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import history from '../history'
import OrganizationProvider, {
  OrganizationContext,
} from '../context/organizationContext'
import AddMemberModal from './AddMemberModal'
import Modal from './Modal'
import {removeUserFromOrgDB} from '../context/axiosService'
import styles from './css/SingleOrganization.module.css'

const ProjectFrame = ({project}) => {
  const {id, name, imageUrl, description, status} = project

  return (
    <Link to={`/projects/${id}`}>
      <div className={styles.projectCardContainer}>
        <div className={styles.cardContents}>
          <img src={imageUrl} />
          <div className={styles.name}>{name}</div>
          <div className={styles.status}>{status}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </Link>
  )
}

const Member = ({member, members, setMembers, authUserAdminStatus}) => {
  // grab user from auth context
  // we'll use this user to redirect ourself
  // if we leave the current organization
  const {user} = useContext(AuthContext)

  // destructure org member (a user instance)
  const {id, firstName, lastName, imageUrl} = member

  // destructure the through-table to get user org role, orgId
  const {role, organizationId} = member.user_organization

  return (
    <div className={styles.memberContainer}>
      <div className={styles.imgAndInfo}>
        <img className={styles.memberAvatar} src={imageUrl} />
        <div className={styles.nameAndRole}>
          <div className={styles.memberName}>{firstName + ' ' + lastName}</div>
          <div className={styles.memberRole}>{role}</div>
        </div>
      </div>
      {authUserAdminStatus && (
        <span
          className={styles.removeBtnContainer}
          onClick={async () => {
            try {
              await removeUserFromOrgDB(organizationId, id)
              setMembers(members.filter((mem) => mem.id !== id))
              if (id === user.id) history.push('/home')
            } catch (err) {
              console.error(err)
            }
          }}
        >
          <i className="material-icons">highlight_off</i>
          <span>Remove</span>
        </span>
      )}
    </div>
  )
}

const SingleOrganization = () => {
  // grab org and its projects, users from organization context
  const {
    organization,
    projects,
    members,
    setMembers,
    authUserAdminStatus,
  } = useContext(OrganizationContext)

  // destructure organization
  const {name, imageUrl} = organization

  // handle modal visibility
  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <div className={styles.wrapper}>
      {isModalVisible && (
        <Modal>
          <AddMemberModal
            members={members}
            setMembers={setMembers}
            closeModal={() => setModalVisible(false)}
          />
        </Modal>
      )}
      <section className={styles.leftPanel}>
        <div className={styles.membersContainer}>
          {members.map((member) => (
            <Member
              key={member.id}
              member={member}
              members={members}
              setMembers={setMembers}
              authUserAdminStatus={authUserAdminStatus}
            />
          ))}
        </div>
        <div className={styles.addUserBtnContainer}>
          <button
            className={styles.addUserToOrgBtn}
            type="button"
            onClick={() => setModalVisible(true)}
          >
            + Add A Teammate
          </button>
        </div>
      </section>
      <section className={styles.rightPanel}>
        <div className={styles.avatarAndName}>
          <img className={styles.avatar} src={imageUrl} />
          <div className={styles.name}>Organization: {name}</div>
        </div>
        <div className={styles.subsectionHeader}>Projects</div>
        <div className={styles.allProjectsContainer}>
          {projects.map((project) => (
            <ProjectFrame key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}

const WrappedSingleOrg = () => (
  <OrganizationProvider>
    <SingleOrganization />
  </OrganizationProvider>
)

export default WrappedSingleOrg
