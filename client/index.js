import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import history from './history'
import App from './app'

import 'react-toastify/dist/ReactToastify.css'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Router history={history}>
    <App />
    <ToastContainer />
  </Router>,
  document.getElementById('app')
)
