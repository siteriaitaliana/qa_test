import { Express } from 'express'
const express = require('express')
const app: Express = express()

const data = require('./mockResponse.json')

app.get('/api/character', (req, res) => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(data))
})

app.listen(3000, () =>
    console.log(
        `Mocking rickandmortyapi server listening on localhost, port 3000!`
    )
)
