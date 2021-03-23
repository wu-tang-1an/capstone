import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'

export const ColumnContext = React.createContext()

const ColumnProvider = ({children}) => {
  const [column, setColumn] = useState({})
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getColumn = async () => {
      try {
        const {data} = await axios.get('/api/columns/:columnId')
        setColumn(data || [])
      } catch (err) {
        console.error(err)
      }
    }
    getColumn()
  }, {})

  console.log('column in columnContext is: ', column)

  if (!tasks.length && column.tasks) setTasks(column.tasks)

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
