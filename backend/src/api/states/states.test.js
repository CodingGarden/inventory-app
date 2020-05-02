const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/states', () => {
  it('should respond with an array of states', async () => {
    const response = await supertest(app)
      .get('/api/v1/states')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should respond with an individual state', async () => {
    const response = await supertest(app)
      .get('/api/v1/states/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toBe(1);
  });

  it('should respond with a 404 for a not found state', async () => {
    await supertest(app)
      .get('/api/v1/states/4200')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
