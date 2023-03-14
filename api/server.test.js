const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})

beforeAll(async () => {
  await db.seed.run();
})



test('[0] Testler çalışır durumda]', () => {
  expect(true).toBe(false)
})

describe('Server Test', () => {
  test("[1] Server çalışıyor mu", async() => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Server Çalışıyor");
  })
})

describe('Auth', () => {
  test("[2] Başarılı bir şekilde kayıt oluyor mu", async() => {
    const res = await request(server).post("/api/auth/register").send({username: 'eaydin1', password: "1234"});
    expect(res.status).toBe(201);
    const isHashed = bcrypt.compareSync('1234', res.body.password);
    expect(isHashed).toBeTruthy();
  });
  test("[3] kullanici adi boş olunca doğru hata mesajı dönüyor mu", async() => {
    const res = await request(server).post("/api/auth/register").send({password: "1234"});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('username ve şifre gereklidir');
  });
  test("[4] halihazırda kullanılan bir kullanici olunca doğru hata mesajı dönüyor mu", async() => {
    const res = await request(server).post("/api/auth/register").send({username: 'bob',password: "1234"});
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('username alınmış');
  });
  test("[5] başarılı bir şekilde giriş yapılıyor mu", async() => {
    const res = await request(server).post("/api/auth/login").send({username: 'bob',password: "1234"});
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('welcome bob');
    expect(res.body.token).toBeDefined();
  });
})
