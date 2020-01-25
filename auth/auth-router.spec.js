const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})

describe('auth router', () => {

    //REGISTRATION
    test('new user', async () => {
        const res = await request(server).post('/api/auth/register')
            .send({ username: "StephenT", password: "superpassword1"})
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
    }) 

    test('new user failed', async () => {
        const res = await request(server).post('/api/auth/register')
            .send({ username: "StephenT", password: ""})
        expect(res.status).toBe(500)
        expect(res.body.message).toMatch(/missing required information/i)
    })


    //LOGIN
    test('correct login', async () => {
        const res = await request(server).post('/api/auth/login')
            .send({ username: "StephenTanksley", password: "superpassword5" })
        expect(res.status).toBe(200)
        // expect(res.body.message).toMatch(/welcome/i)
    })

    test('incorrect login', async () => {
        const res = await request(server).post('/api/auth/login')
            .send({ username: "Kima", password: "donutt"})
        expect(res.status).toBe(401)
        expect(res.body.message).toMatch(/invalid credentials/i)
    })
})