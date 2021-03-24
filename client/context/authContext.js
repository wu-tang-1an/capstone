import React, {useState, useMemo} from 'react'

export const AuthContext = React.createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({})

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
