import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const ProjectContext = React.createContext()

export default function ProjectProvider({children, userId}) {
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data} = await axios.get(`/api/users`)
        setUsers(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUser()
  }, {})

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {data} = await axios.get(`/api/tasks`)
        setTasks(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTasks()
  }, [])

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const {data} = await axios.get(`/api/columns`)
        setColumns(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchColumns()
  }, [])

  const providerValue = useMemo(() => {
    return {
      users,
      setUsers,
      tasks,
      setTasks,
      columns,
      setColumns,
    }
  }, [users, tasks])

  return (
    <ProjectContext.Provider value={providerValue}>
      {children}
    </ProjectContext.Provider>
  )
}
