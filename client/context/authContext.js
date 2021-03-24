import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const AuthContext = React.createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getMe = async () => {
      try {
        const {data} = await axios.get('/auth/me')
        setUser(data || {})
      } catch (err) {
        console.error(err)
      }
    }
    getMe()
  }, {})

  const providerValue = useMemo(() => {
    return {user, setUser}
  }, [user])

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
