import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const ProjectContext = React.createContext()

export default function ProjectProvider({projectId, children}) {
  // initialize project-level state
  const [project, setProject] = useState({})
  const [columns, setColumns] = useState([])

  console.log('projectId in projectContext is: ', projectId)

  // fetch project by projectId
  useEffect(() => {
    const fetchSingleProject = async () => {
      try {
        const {data} = await axios.get(`/api/projects/${projectId}`)
        setProject(data || {})
      } catch (err) {
        console.error(err)
      }
    }
    fetchSingleProject()
  }, {})

  // this check prevents endless rerenders due to setting columns after successfully fetching the current project
  if (!columns.length && project.columns) setColumns(project.columns)

  const providerValue = useMemo(() => {
    return {
      project,
      setProject,
      columns,
      setColumns,
    }
  }, [project, columns])

  console.log('provider value is : ', providerValue)

  return (
    <ProjectContext.Provider value={providerValue}>
      {children}
    </ProjectContext.Provider>
  )
}
