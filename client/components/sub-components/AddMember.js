import React from 'react'
import {IconContext} from 'react-icons'
import {HiUserAdd} from 'react-icons/hi'

function AddMember() {
  return (
    <div style={{display: 'flex'}}>
      <h5 style={{display: 'block'}}>Add Member</h5>
      <IconContext.Provider value={{size: '2rem', style: {display: 'block'}}}>
        <HiUserAdd />
      </IconContext.Provider>
    </div>
  )
}

export default AddMember
