const express = require("express")

const db = require("./data/dbConfig.js")

const server = express()

server.use(express.json())

server.get("/api/accounts", async (req, res) => {
    const accounts = await db("accounts")
    res.json(accounts)
})

server.post("/api/accounts", async (req, res) => {
    const [id] = await db.insert(req.body).into("accounts")
    const createdAccount = await db
        .select()
        .table("accounts")
        .where("id", id)
    res.json(createdAccount)
})

server.put("/api/accounts/:accountId", async (req, res) => {
    const { accountId } = req.params
    const update = req.body

    const id = await db("accounts")
        .where("id", accountId)
        .update(update)
    const updatedAccount = await db
        .select()
        .table("accounts")
        .where("id", id)
    res.json(updatedAccount)
})

module.exports = server
