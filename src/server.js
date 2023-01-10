require("express-async-errors")
const express = require("express")
const app = express()
const PORT = 3333
const routes = require("./routes")
const ErrorHandling = require("./utils/errorHandling")
const sqliteConnection = require("./database/sqlite")

sqliteConnection()

app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if(error instanceof ErrorHandling) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: error,
    message: "Internal server error"
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))