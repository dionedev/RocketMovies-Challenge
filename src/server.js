const express = require("express")
const app = express()
const PORT = 3333
const routes = require("./routes")

const sqliteConnection = require("./database/sqlite")

sqliteConnection()

app.use(express.json())
app.use(routes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))