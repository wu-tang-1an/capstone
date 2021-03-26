import React from 'react'
import Nav from './components/Nav'
import Routes from './routes'
import AuthProvider from './context/authContext'

const App = () => {
  return (
    <AuthProvider>
      <Nav />
      <Routes />
    </AuthProvider>
  )
}

export default App
