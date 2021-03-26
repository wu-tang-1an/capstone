import React, {useState} from 'react'

export const DropDownContext = React.createContext()

const DropDownProvider = ({children}) => {
  const [areClosedAllDropDown, setClosedAllDropDown] = useState(false)

  const providerValue = {
    areClosedAllDropDown,
    setClosedAllDropDown,
  }

  return (
    <DropDownContext.Provider value={providerValue}>
      {children}
    </DropDownContext.Provider>
  )
}

export default DropDownProvider
