import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router'
import styles from './css/SingleOrg.css'
import axios from 'axios'

function SingleOrg({match}) {
  const [members, setMembers] = useState([])
  const [projects, setProjects] = useState([])
  const [organization, setOrganization] = useState({})
  const [amount, setAmount] = useState(0)

  const {organizationId} = match.params

  useEffect(() => {
    async function fetchMembersApi() {
      try {
        const {data} = await axios.get(
          `/api/organizations/${organizationId}/users`
        )
        setAmount(data.length)
        setMembers(data)
      } catch (e) {
        console.log(e)
      }
    }

    async function fetchProjectsApi() {
      try {
        const {data} = await axios.get(`/api/organizations/${organizationId}`)
        setOrganization(data)
        setProjects(data.projects)
      } catch (e) {
        console.log(e)
      }
    }

    fetchMembersApi()
    fetchProjectsApi()
  }, [])

  return (
    <div className={styles.singleOrgViewCont}>
      <div className={styles.dataCont}>
        <div className={styles.orgNameCont}>
          <div className={styles.orgImgCont}>
            <img className={styles.orgImg} src={organization.imageUrl} />
          </div>

          <div className={styles.orgNameInfo}>
            <h1>{organization.name}</h1>
            <h3>Members: {amount}</h3>
          </div>
        </div>

        <div className={styles.projectAndMemsCont}>
          <div className={styles.projectsCont}>
            <h1>Projects</h1>
            {projects.map((project, index) => {
              return (
                <div key={index} className={styles.singleProjectCont}>
                  <div>
                    <img
                      src={project.imageUrl}
                      className={styles.singleProjectImg}
                    />
                  </div>

                  <div className={styles.singleProjectInfoCont}>
                    <h1>{project.name}</h1>
                    <span>Status:</span>
                    <span>{project.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.membersCont}>
            <h1>Members</h1>
            {members.map((member, index) => {
              return (
                <div key={index} className={styles.singleMemberCont}>
                  <div>
                    <img
                      src={member.imageUrl}
                      className={styles.singleMemberImg}
                    />
                  </div>

                  <div className={styles.singleMemberInfoCont}>
                    <h1>{`${member.firstName} ${member.lastName}`}</h1>
                    <h4>{member.user_organization.role.toUpperCase()}</h4>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(SingleOrg)
