const request = require('supertest')
const server = require('./server')

describe('server.js', () => {
    describe('index route', () => {

        it('should return a 200 status code from the index route', async () => {
            const expectedStatus = 200;
            const response = await request(server).get('/');
            expect(response.status).toEqual(expectedStatus)
        })

        it('should return a JSON object from the index route', async () => {
            const expectedBody = {message: "Jokes API."}
            const response = await request(server).get('/')
            expect(response.body).toEqual(expectedBody)
        })

        it('should return in application/json format', async () => {
            const response = await request(server).get('/')
            expect(response.type).toEqual('application/json')
        })
    })
})