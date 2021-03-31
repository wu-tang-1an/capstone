import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import history from '../history'
import {AuthContext} from '../context/authContext'
import styles from './css/LandingPage.module.css'

const LandingPage = () => {
  const {user} = useContext(AuthContext)

  const [email, setEmail] = useState('')

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroBg}>
        <section>
          <div>
            <div className={styles.bigText}>
              Grow your team with{' '}
              <span className={styles.notearyColor}>note&#8209;ary</span>.
            </div>
            <p className={styles.mainCopy}>
              Note-ary is a collaborative project management suite that empowers
              colleagues to reach new heights of productivity.
            </p>
            {user && user.id && (
              <div className={styles.gotoProjects}>
                <Link to="/organizations">
                  <button type="button">Go to my projects</button>
                </Link>
              </div>
            )}
            {user && !user.id && (
              <form
                onSubmit={() => {
                  localStorage.setItem('newUserEmail', email)
                  history.push('/signup')
                }}
              >
                <input
                  type="signup"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <button type="submit">Sign up!</button>
              </form>
            )}
          </div>
          <img src="https://i.imgur.com/aFiuSX9.jpg" />
        </section>
      </div>
    </div>
  )
}

export default LandingPage
