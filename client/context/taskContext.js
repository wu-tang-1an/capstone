import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const TaskContext = React.createContext()

export default function TaskProvider({taskId, children}) {
  // initialize task-level state
  const [task, setTask] = useState({})

  // fetch task by taskId
  useEffect(() => {
    const fetchSingleTask = async () => {
      try {
        const {data} = await axios.get(`/api/tasks/${taskId}`)
        setTask(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSingleTask()
  }, {})

  const providerValue = useMemo(() => {
    return {
      task,
      setTask,
    }
  }, [task])

  return (
    <TaskContext.Provider value={providerValue}>
      {children}
    </TaskContext.Provider>
  )
}
