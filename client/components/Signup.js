import React from 'react'

const Signup = () => {
  const newUserEmail = localStorage.getItem('newUserEmail')

  return <div>welcome, {newUserEmail}!</div>
}

export default Signup
