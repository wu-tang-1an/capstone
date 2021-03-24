import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext'
import {CgOrganisation} from 'react-icons/cg'
import {IconContext} from 'react-icons'
import styles from './css/AllOrgs.css'

const AllOrgs = () => {
  // grab user from auth context
  const {user} = useContext(AuthContext)

  const {organizations} = user || []

  return (
    <div>
      {user.organizations && (
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
