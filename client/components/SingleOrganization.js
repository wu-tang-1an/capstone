/* eslint-disable camelcase */
import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import history from '../history'
import OrganizationProvider, {
  OrganizationContext,
} from '../context/organizationContext'
import Modal from './Modal'
import AddMemberModal from './AddMemberModal'
import AddProjectModal from './AddProjectModal'
import ProjectFrameDropDown from './ProjectFrameDropDown'
import {removeUserFromOrgDB, fetchUserDB} from '../context/axiosService'
import styles from './css/SingleOrganization.module.css'

import socket, {socketSent, socketReceived} from '../socket'

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

const ProjectFrame = ({
  organization,
  project,
  projects,
  setProjects,
  authUserAdminStatus,
}) => {
  // destructure project
  const {id, name, imageUrl, description, status} = project

  // local state mgmt, dropdown menu
  const [isProjectDropDownVisible, setProjectDropDownVisible] = useState(false)

  // separate links to sequester delete btn
  return (
    <div className={styles.frameBoundary}>
      {isProjectDropDownVisible && (
        <ProjectFrameDropDown
          organization={organization}
          project={project}
          projects={projects}
          setProjects={setProjects}
          closeDropDown={() => setProjectDropDownVisible(false)}
        />
      )}
      <div className={styles.projectFrameContainer}>
        <Link to={`/projects/${id}`}>
          <img src={imageUrl} />
        </Link>
        <div className={styles.projectContents}>
          {authUserAdminStatus && (
            <div
              className={styles.menuContainer}
              onClick={() =>
                setProjectDropDownVisible(!isProjectDropDownVisible)
              }
            >
              <span>
                <i className="material-icons">more_horiz</i>
              </span>
            </div>
          )}
          <Link to={`/projects/${id}`}>
            <div className={styles.projectName}>{name}</div>
            <div className={styles.projectStatus}>{status}</div>
            <div className={styles.projectDescription}>{description}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

const SingleOrganization = () => {
  // grab auth user from auth context
  const {user} = useContext(AuthContext)

  // grab org and its projects, users from organization context
  const {
    organization,
    projects,
    setProjects,
    members,
    setMembers,
    authUserAdminStatus,
  } = useContext(OrganizationContext)

  // destructure organization
  const {id, name, imageUrl} = organization

  // handle modal visibility
  const [isAddMemModalVisible, setAddMemModalVisible] = useState(false)
  const [isAddProjectModalVisible, setAddProjectModalVisible] = useState(false)

  // handle accepted invite
  socket.on(socketReceived.INVITE_WAS_ACCEPTED, async ({userWhoAccepted}) => {
    console.log(
      `${
        userWhoAccepted.firstName + ' ' + userWhoAccepted.lastName
      } accepted invite!`
    )

    try {
      // fetch user with organizations for determining role
      // in thisOrg
      const foundUser = await fetchUserDB(userWhoAccepted.id)

      // grab user org and append to foundUser instance
      const user_organization = foundUser.organizations.find(
        (org) => org.id === organization.id
      ).user_organization

      // append user_organization through table instance to foundUser
      foundUser.user_organization = user_organization

      // set local state now that user_organization and user role within thisOrg is available
      setMembers([...members, foundUser])
    } catch (err) {
      // do nothing -- type error thrown here, ignore
    }
  })

  // handle user left
  socket.on(socketReceived.USER_LEFT_ORG, ({ignoreUser, userWhoLeft}) => {
    if (socket.id === ignoreUser) return
    setMembers(members.filter((mem) => mem.id !== userWhoLeft.id))
  })

  return (
    <div className={styles.wrapper}>
      {isAddMemModalVisible && (
        <Modal>
          <AddMemberModal
            orgId={id}
            members={members}
            setMembers={setMembers}
            closeModal={() => setAddMemModalVisible(false)}
          />
        </Modal>
      )}
      {isAddProjectModalVisible && (
        <Modal>
          <AddProjectModal
            orgId={id}
            projects={projects}
            setProjects={setProjects}
            closeModal={() => setAddProjectModalVisible(false)}
          />
        </Modal>
      )}
      <section className={styles.leftPanel}>
        <div className={styles.membersTitle}>
          <span>{name}</span> Members
        </div>
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
        {authUserAdminStatus && (
          <div className={styles.addUserBtnContainer}>
            <button
              className={styles.addUserToOrgBtn}
              type="button"
              onClick={() => setAddMemModalVisible(true)}
            >
              + Add A Teammate
            </button>
          </div>
        )}
      </section>
      <section className={styles.rightPanel}>
        <div className={styles.avatarAndName}>
          <img src={imageUrl} />
          <span>{name}</span>
        </div>
        <div className={styles.headerAndBtn}>
          <span className={styles.projectHeader}>Projects</span>
          {authUserAdminStatus && (
            <button
              className={styles.createProjectBtn}
              type="button"
              onClick={() => setAddProjectModalVisible(true)}
            >
              + Create A Project
            </button>
          )}
        </div>
        <div className={styles.allProjectsContainer}>
          {projects.map((project) => (
            <ProjectFrame
              key={project.id}
              organization={organization}
              project={project}
              projects={projects}
              setProjects={setProjects}
              authUserAdminStatus={authUserAdminStatus}
            />
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
