import React from 'react'
import styled from 'styled-components'

import {removeUserFromOrgDB} from '../../context/axiosService'

const Button = styled.button`
  background-color: red;
  border-radius: 16px;
  padding: 3px;
  margin-bottom: 1px;
  outline: 0;
  color: white;
  border-color: red;
`

export default function RemoveUser(props) {
  const {orgId, userId} = props
  console.log('these are the props, ', props)
  return (
    <div>
      <Button
        type="submit"
        onClick={() => {
          removeUserFromOrgDB(orgId, userId)
          props.removeUser(userId)
        }}
      >
        Remove
      </Button>
    </div>
  )
}
