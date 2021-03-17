import React from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'

const Board = () => {
  return (
    <Grid container direction="row" justify="flex-start">
      <Grid container item xs={12}>
        hello i'm a card
      </Grid>
      <Grid container item xs={12}>
        hello i'm a card
      </Grid>
      <Grid container item xs={12}>
        hello i'm a card
      </Grid>
    </Grid>
  )
}

const mapState = (state) => ({})
const mapDispatch = (dispatch) => ({})

export default connect(mapState, mapDispatch)(Board)
