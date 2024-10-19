import { Express } from 'express'
const express = require('express')
const app: Express = express()

const data = require('./mockResponse.json')

app.get('/api/character', (req, res) => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(data))
})

app.listen(3000, () => console.log(`Hello world app listening on port 3000!`))
