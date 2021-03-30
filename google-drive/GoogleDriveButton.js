import React, {useState, useEffect} from 'react'
import {DISCOVERY_DOCS, SCOPES, getDriveRequestBody} from './index'
require('../secrets')

const GoogleDriveButton = () => {
  const [userName, setUserName] = useState('')
  const [isLoadingGAPI, setLoadingGAPI] = useState(false)
  const [googleAuth, setGoogleAuth] = useState(null)

  const initClient = () => {
    setLoadingGAPI(true)
    try {
      window.gapi.client
        .init({
          apiKey: process.env.GOOGLE_DRIVE_API_KEY,
          clientId: process.env.GOOGLE_CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          setGoogleAuth(window.gapi.auth2.getAuthInstance())
          if (googleAuth === null) return
          googleAuth.isSignedIn.listen(isLoadingGAPI)
        })
    } catch (err) {
      console.error(err)
    }
  }

  const handleClientLoad = () => {
    window.gapi.load('client:auth2', initClient)
  }

  const loadGAPIScript = async () => {
    const script = document.createElement('script')
    script.onload = handleClientLoad
    script.src = 'https://apis.google.com/js/api.js'
    document.body.appendChild(script)
  }

  useEffect(() => {
    loadGAPIScript()
  }, [])

  const updateSignStatus = async () => {
    try {
      const user = googleAuth.currentUser.get()
      if (user.wc === null) {
        setUserName('')
      } else {
        const isAuthorized = user.hasGrantedScopes(SCOPES)
        if (isAuthorized) setUserName(user.Qs.Te)
        else
          throw new Error(
            'user has not granted permissions required for this action'
          )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const uploadFileToDrive = () => {
    // a random string that is used with delimiters to indicate multipart request
    const boundary = 'noteary'

    // the file we'd like to add along with its content-type and metadata
    const fileName = 'myFile'
    const fileData = 'sample data for my file'
    const userSuppliedContentType = 'text/plain'
    const metadata = {
      name: fileName,
      mimeType: userSuppliedContentType,
    }

    // helper generates request body
    const requestBody = getDriveRequestBody(
      boundary,
      fileData,
      userSuppliedContentType,
      metadata
    )

    const myDriveRequest = window.gapi.client.request({
      path: 'https://www.googleapis.com/upload/drive/v3/files',
      method: 'POST',
      params: {uploadType: 'multipart'},
      headers: {
        'Content-Type': 'multipart/related; boundary=' + boundary + '',
      },
      body: requestBody,
    })

    myDriveRequest.execute((file) => console.log(file))
  }

  const signIn = () => {
    googleAuth.signIn()
    updateSignStatus()
  }

  return (
    <div>
      {/* <button type="button" onClick={signIn}>
        Approve Google Drive Access
      </button> */}
      <button
        type="button"
        onClick={() => {
          if (!googleAuth) signIn()
          uploadFileToDrive()
        }}
      >
        Upload File To Drive
      </button>
    </div>
  )
}

export default GoogleDriveButton
