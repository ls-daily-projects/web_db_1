const express = require("express")

const db = require("./data/dbConfig.js")

const server = express()

server.use(express.json())

server.get("/api/accounts", async (req, res) => {
    const accounts = await db("accounts")
    res.json(accounts)
})

module.exports = server
