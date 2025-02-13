import request from 'supertest';
import app from '../src/app';
test('GET / should return Hello World', async () => {
  const res = await request(app).get('/');
  expect(res.text).toBe('Hello World!');
});
