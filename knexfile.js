const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "databaseMovies.db")
    },
    useNullAsDefault: true
  },

};
