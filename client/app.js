import React from 'react'
import NewNav from './components/NewNav'
import Routes from './routes'
import AuthProvider from './context/authContext'

const App = () => {
  return (
    <AuthProvider>
      <NewNav />
      <Routes />
    </AuthProvider>
  )
}

export default App
