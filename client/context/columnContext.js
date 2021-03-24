import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const ColumnContext = React.createContext()

const ColumnProvider = ({children, columnId}) => {
  const [column, setColumn] = useState({})
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // assign a flag to check if component is mounted
    // this will prevent memory leak of updating state on an unmounted component
    let isMounted = true

    // fetch a column
    const getColumn = async () => {
      try {
        const {data} = await axios.get(`/api/columns/${columnId}`)
        setColumn(data || {})
      } catch (err) {
        console.error(err)
      }
    }
    getColumn()

    // return a cleanup function that sets isMounted = false
    return () => {
      isMounted = false
    }
  }, [])

  // this check prevents endless rerenders due to setting columns after successfully fetching the current project
  if (!tasks.length && column.tasks && column.tasks[0]) setTasks(column.tasks)

  const providerValue = useMemo(() => {
    return {column, setColumn, tasks, setTasks}
  }, [column, tasks])

  return (
    <ColumnContext.Provider value={providerValue}>
      {children}
    </ColumnContext.Provider>
  )
}

export default ColumnProvider
