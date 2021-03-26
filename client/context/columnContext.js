import React, {useState} from 'react'
import SingleTaskExpanded from '../components/SingleTaskExpanded'
import Modal from '../components/Modal'

export const ColumnContext = React.createContext()

const ColumnProvider = ({children}) => {
  // activeTask is set by taskDropDown to make singleTaskExpanded
  // modal appear ABOVE the drag/drop context
  // keeps modal from being draggable
  const [activeTask, setActiveTask] = useState(0)
  const [isSingleTaskVisible, setSingleTaskVisible] = useState(false)

  const providerValue = {
    activeTask,
    setActiveTask,
    isSingleTaskVisible,
    setSingleTaskVisible,
  }

  return (
    <ColumnContext.Provider value={providerValue}>
      {children}
      {/* single task expanded view lifted to column provider
      to put view out of drag-and-drop control -- this keeps the modal from being draggable! */}
      {isSingleTaskVisible && (
        <Modal>
          <SingleTaskExpanded
            task={activeTask}
            closeModal={() => setSingleTaskVisible(false)}
          />
        </Modal>
      )}
    </ColumnContext.Provider>
  )
}

export default ColumnProvider
