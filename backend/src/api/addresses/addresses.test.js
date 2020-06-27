const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/addresses', () => {
  it('should respond with an array of addresses', async () => {
    const response = await supertest(app)
      .get('/api/v1/addresses')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });
});
