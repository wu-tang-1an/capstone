// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
]

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive'

const getDriveRequestBody = (
  boundary,
  fileData,
  userSuppliedContentType,
  metadata
) => {
  const delimiter = '\r\n--' + boundary + '\r\n'
  const closeDelim = '\r\n--' + boundary + '--'

  const mainContentType =
    'Content-Type: application/json; charset=UTF-8\r\n\r\n'

  return (
    delimiter +
    mainContentType +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: ' +
    userSuppliedContentType +
    '\r\n\r\n' +
    fileData +
    '\r\n' +
    closeDelim
  )
}

export {DISCOVERY_DOCS, SCOPES, getDriveRequestBody}
