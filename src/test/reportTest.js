import request from 'supertest';
import app from '../bootstrap/server.js'; 
import { sequelize } from '../config/dbConfig.js';

describe('Journey Report Tests', () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  });

  // Testing for successful journey report submission
  it('should submit a journey report successfully', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'thisIs@example.com', 
        password: 'password123',
      });

    const token = loginRes.body.token;  // Extract the JWT token

    const res = await request(app)
      .post('/api/journeys/submit-report')
      .set('Authorization', `Bearer ${token}`)
      .send({
        journeyId: 'f9b15c99-08da-44ee-9bff-1a0d309ba634',  
        journeyDuration: 5,
        fuelConsumption: 20.5,
        passengerFeedback: 'Good service',
        issuesReported: 'small delays due to traffic',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Journey report submitted successfully');
    expect(res.body.report).toHaveProperty('journeyId');
  });

  // Testing for missing fields
  it('should return error for missing journey duration', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'thisIs@example.com',
        password: 'password123',
      });

    const token = loginRes.body.token;

    const res = await request(app)
      .post('/api/journeys/submit-report')
      .set('Authorization', `Bearer ${token}`)
      .send({
        journeyId: 'f9b15c99-08da-44ee-9bff-1a0d309ba634', 
      });

    expect(res.statusCode).toEqual(400);  
    expect(res.body.message).toContain('journeyDuration is required');
  });

  // Testing for unauthorized user
  it('should return error for unauthorized user (non-driver/admin)', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'thisIs@example.com',
        password: 'password123',
      });

    const token = loginRes.body.token;

    const res = await request(app)
      .post('/api/journeys/submit-report')
      .set('Authorization', `Bearer ${token}`)
      .send({
        journeyId: 'f9b15c99-08da-44ee-9bff-1a0d309ba634',
        journeyDuration: 5,
      });

    expect(res.statusCode).toEqual(403); 
    expect(res.body.message).toEqual('You are not authorized to submit a journey report');
  });

});
