const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})

describe('auth router', () => {
    test('new user', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: "StephenT",
                password: "superpassword1"
            })
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
    }) 

    test('new user failed', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: "StephenT",
                password: ""
        })
        expect(res.status).toBe(401)
    })

    test('correct login', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({username: "StephenT", password: "superpassword1"
        })
        expect(res.status).toBe(201)
    })

    test('incorrect login', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: "StephenTT", password: "superpassword1"})
    })
    expect(res.status).toBe(401)
})