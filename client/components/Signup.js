import React, {useState} from 'react'
import styles from './css/Signup.module.css'

const Signup = () => {
  // retrieve the user's email from landing page
  const newUserEmail = localStorage.getItem('newUserEmail')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(newUserEmail || '')
  const [password, setPassword] = useState('')

  return (
    <section>
      <div className={styles.signupContainer}>
        <div className={styles.title}>
          Signup with <br />
          <span className={styles.notearyColor}>note-ary</span>
        </div>
        <form>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.localSignup}>
              Signup with note-ary
            </button>
            <button type="button" className={styles.googleSignup}>
              <span>
                <img src="/google-logo.webp" />
              </span>
              Signup with Google
            </button>
          </div>
        </form>
      </div>
      <div className={styles.photo}>
        <div className={styles.transparencyMask}></div>
      </div>
    </section>
  )
}

export default Signup
