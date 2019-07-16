const express = require("express")

const db = require("./data/dbConfig.js")

const server = express()

server.use(express.json())

const router = express.Router()

router.get("/api/accounts", async (_req, res, next) => {
    try {
        const accounts = await db("accounts")
        res.json(accounts)
    } catch (error) {
        next(error)
    }
})

router.post("/api/accounts", async (req, res, next) => {
    try {
        const [id] = await db.insert(req.body).into("accounts")
        const createdAccount = await db
            .select()
            .table("accounts")
            .where("id", id)
        res.json(createdAccount)
    } catch (error) {
        next(error)
    }
})

router.put("/api/accounts/:accountId", async (req, res, next) => {
    const { accountId } = req.params
    const update = req.body

    try {
        const count = await db("accounts")
            .where("id", accountId)
            .update(update)
        const err422 = Error("Couldn't Update")
        if (count === 0) return next(err422)
        const account = await db("accounts")
            .where("id", accountId)
            .first()
        res.json(account)
    } catch (error) {
        next(error)
    }
})

router.delete("/api/accounts/:accountId", async (req, res, next) => {
    const { accountId } = req.params

    try {
        await db("accounts")
            .where("id", accountId)
            .del()

        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
server.use(router)
server.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({
        error: err.name,
        message: err.message
    })
})

module.exports = server
