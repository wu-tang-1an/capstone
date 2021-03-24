const resNaN = (id, res) => {
  return res.status(400).send(id + ' is not a number')
}

const resDbNotFound = (string, res) => {
  return res.status(404).send(string + ' not found in database')
}

const resAssoc = (string1, string2, id1, id2, res) => {
  return res
    .status(200)
    .send(string1 + ' ' + id1 + ' associated with ' + string2 + ' ' + id2)
}

const resDeleted = (string, id, res) => {
  return res.status(204).send(string + ' ' + id + ' deleted')
}

module.exports = {resNaN, resDbNotFound, resAssoc, resDeleted}
