import React from 'react'
import {Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    width: '100%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const TaskCard = () => {
  const classes = useStyles()
  return <Paper className={classes.paper}>item</Paper>
}

export default TaskCard
