let database = null

const init = function (db) {
  database = db
}

const getRef = function (path) {
  return database.ref(path)
}

const getDb = function () {
  return database
}

export default { init, getRef, getDb }
