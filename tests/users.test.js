const request = require('supertest');
const server = require('../src/server');
const connection = require('../src/db-connection');

const user = {
  name: 'damien',
  email: 'dland@email.com',
  address: '2 rue du test',
  user_password: '12345678Pass',
};

beforeAll(async () => {
  let sql = 'DELETE FROM users WHERE id>0';
  await connection.promise().query(sql);
  sql = 'ALTER TABLE users AUTO_INCREMENT=1';
  await connection.promise().query(sql);
});

describe('Ce que je teste : users routes', () => {
  it('Cas de test : GETs /api/users should return 200 and an empty array', async () => {
    const response = await request(server).get('/api/users').expect(200);
    expect(response.body.length).toEqual(0);
  });

  it('Cas de test : POSTs /api/users should return 201 and a user', async () => {
    const response = await request(server).post('/api/users').send(user).expect(201);
    expect(response.body.id).toEqual(1);
    // permet de voir le message renvoyé par l'erreur : expect(response.text).toEqual(0);
  });
});
