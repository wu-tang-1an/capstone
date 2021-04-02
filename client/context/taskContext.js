import React, {useState} from 'react'

export const TaskContext = React.createContext()

export default function TaskProvider({children}) {
  // hold dropDownTargetId to selectively open drop downs
  // in project view, for a given task
  // important! this context keeps drop down menus from
  // opening on EVERY task in a column
  const [dropDownTargetId, setDropDownTargetId] = useState(0)
  const [isTaskDropDownVisible, setTaskDropDownVisible] = useState(false)
  const [dragDisabled, setDragDisabled] = useState(false)

  const providerValue = {
    dropDownTargetId,
    setDropDownTargetId,
    isTaskDropDownVisible,
    setTaskDropDownVisible,
    dragDisabled,
    setDragDisabled,
  }

  return (
    <TaskContext.Provider value={providerValue}>
      {children}
    </TaskContext.Provider>
  )
}
