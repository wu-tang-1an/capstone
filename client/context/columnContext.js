import React, {useState, useEffect, useContext} from 'react'
import SingleTaskExpanded from '../components/SingleTaskExpanded'
import {ProjectContext} from './projectContext'
import {getOrgDb} from './axiosService'
import Modal from '../components/Modal'

export const ColumnContext = React.createContext()

const ColumnProvider = ({children}) => {
  // activeTask is set by taskDropDown to make singleTaskExpanded
  // modal appear ABOVE the drag/drop context
  // keeps modal from being draggable
  const [activeTask, setActiveTask] = useState(0)
  const [isSingleTaskVisible, setSingleTaskVisible] = useState(false)

  // grab project from project context, get orgId from project
  // grab users to make available to SingleTaskExpanded for
  // AddUserToTask select
  const {project} = useContext(ProjectContext)

  const [thisOrg, setThisOrg] = useState({})

  useEffect(() => {
    const getOrg = async () => {
      try {
        const org = await getOrgDb(project.organizationId)
        setThisOrg(org)
      } catch (err) {
        console.error(err)
      }
    }
    getOrg()
  }, [])

  const orgUsers = thisOrg.users

  const providerValue = {
    activeTask,
    setActiveTask,
    isSingleTaskVisible,
    setSingleTaskVisible,
    orgUsers,
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
