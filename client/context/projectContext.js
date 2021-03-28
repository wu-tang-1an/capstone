import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const ProjectContext = React.createContext()

export default function ProjectProvider({projectId, children}) {
  // initialize project-level state
  const [project, setProject] = useState({})
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])
  const [comments, setComments] = useState([])
  const [taskChanged, setTaskChanged] = useState(false)

  // fetch project by projectId
  useEffect(() => {
    let isMounted = true
    const fetchSingleProject = async () => {
      try {
        const {data} = await axios.get(`/api/projects/${projectId}`)
        setProject(data)
        setColumns(data.columns.sort((a, b) => a.id - b.id))
        setTasks(columns.map((column) => column.tasks).flat())
        setComments(tasks.map((task) => task.comments).flat())
      } catch (err) {
        console.error(err)
      }
    }
    fetchSingleProject()

    return () => {
      isMounted = false
    }
  }, [taskChanged])

  const providerValue = useMemo(() => {
    return {
      project,
      setProject,
      columns,
      setColumns,
      tasks,
      setTasks,
      comments,
      setComments,
      taskChanged,
      setTaskChanged,
    }
  }, [project, columns, tasks, comments])

  return (
    <ProjectContext.Provider value={providerValue}>
      {children}
    </ProjectContext.Provider>
  )
}
