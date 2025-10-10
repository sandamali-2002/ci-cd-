const request = require('supertest')
const app = require('../index')

describe('Students API', () => {
  it('GET /health should return ok', async () => {
    const res = await request(app).get('/health')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ status: 'ok' })
  })

  it('POST /students should create a student', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Alice', age: 20 })
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Alice')
    expect(res.body.age).toBe(20)
  })

  it('POST /students invalid payload should return 400', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: '', age: -1 })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('GET /students should return list', async () => {
    const res = await request(app).get('/students')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
