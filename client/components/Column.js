import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import TaskCard from './TaskCard'

const useStyles = makeStyles((theme) => ({
  style: {
    backgroundColor: '#bbbbbb',
    height: '100%',
  },
}))

const Column = (props) => {
  const classes = useStyles()

  return (
    <Grid item xs={2} className={classes.style}>
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </Grid>
  )
}

export default Column
