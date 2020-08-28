const supertest = require('supertest');

const app = require('../app');
const project = require('../constants/project');

describe('GET /api/v1', () => {
  it('should respond with a message', async () => {
    const response = await supertest(app)
      .get('/api/v1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(project.message);
  });
});
