import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const ProjectContext = React.createContext()

export default function ProjectProvider({projectId, children}) {
  // initialize project-level state
  const [project, setProject] = useState({})
  const [columns, setColumns] = useState([])

  // fetch project by projectId
  useEffect(() => {
    let isMounted = true
    const fetchSingleProject = async () => {
      try {
        const {data} = await axios.get(`/api/projects/${projectId}`)
        setProject(data || {})
      } catch (err) {
        console.error(err)
      }
    }
    fetchSingleProject()

    return () => {
      isMounted = false
    }
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

  return (
    <ProjectContext.Provider value={providerValue}>
      {children}
    </ProjectContext.Provider>
  )
}
