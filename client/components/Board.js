import React from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Column from './Column'

const useStyles = makeStyles((theme) => ({
  style: {
    backgroundColor: '#ddd',
    height: '100vh',
    width: '100vw',
    flexGrow: 0,
  },
}))

const Board = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={2}
      justify="space-evenly"
      className={classes.style}
    >
      <Column name="Todo" />
      <Column name="In-progress" />
      <Column name="Review" />
      <Column name="Done" />
    </Grid>
  )
}

export default Board
