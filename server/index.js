const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const students = []
let nextId = 1

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.get('/students', (req, res) => {
  res.json(students)
})

app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id)
  const student = students.find(s => s.id === id)
  if (!student) return res.status(404).json({ error: 'Not found' })
  res.json(student)
})

app.post('/students', (req, res) => {
  const { name, age } = req.body
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid name' })
  }
  if (!age || typeof age !== 'number' || age <= 0) {
    return res.status(400).json({ error: 'Invalid age' })
  }
  const student = { id: nextId++, name: name.trim(), age }
  students.push(student)
  res.status(201).json(student)
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Student API listening on ${port}`))

module.exports = app
