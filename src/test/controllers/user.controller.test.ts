
import request, { Response } from 'supertest';
import express from 'express';
import router from '../../config/routes';
import cors from 'cors'
import { IResponseApi } from '../../interfaces';
import { IUserWOP } from '../../users/entity';


const app = express();
let server: any;
let token: any;


beforeAll(async () => {
  app.use(cors({
    origin: '*'
  }))
  app.use(express.json());
  app.use('/api', router);
  server = app.listen(4042);

  const { text } = await request(app)
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .send({ email: 'saidnnnn@gmail.com', password: "123456" })

  const { data } = JSON.parse(text)
  token = data.accessToken

})


const rollBack = async (path: string): Promise<Response> => {
  return await request(app)
    .delete(path)
    .set('Accept', 'application/json')
    .set({ Authorization: `Bearer ${token}` })
    .expect(200)
}


describe('Test in user controller', () => {

  test('should create a new user', async () => {
    const { body: postBody } = await request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: 'test', email: "test@gmail.com", password: "123456", phone: "5589747895" })
      .expect('Content-Type', /json/)
      .expect(201)

    const postResponse: IResponseApi<IUserWOP> = postBody;

    expect(postResponse.data?.id).toBeDefined();
    expect(postResponse.data?.name).toEqual("test");
    expect(postResponse.data?.createdAt).toBeDefined();

    await rollBack(`/api/user/${postResponse.data?.id}`);
  });

  test('should edit a user', async () => {
    const { body: postBody } = await request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: 'test', email: "test@gmail.com", password: "123456", phone: "5589747895" })
      .expect('Content-Type', /json/)
      .expect(201)

    const postResponse: IResponseApi<IUserWOP> = postBody;

    expect(postResponse.data?.id).toBeDefined();
    expect(postResponse.data?.name).toEqual("test");
    expect(postResponse.data?.createdAt).toBeDefined();

    const { body: putBody } = await request(app)
      .put(`/api/user/${postResponse.data?.id}`)
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: 'test25', email: "test25@gmail.com" })
      .expect(200)


    const putResponse: IResponseApi<IUserWOP> = putBody;
    console.log({ putResponse });
    expect(putResponse.data?.id).toEqual(postResponse.data?.id);
    expect(putResponse.data?.name).not.toEqual("test");
    expect(putResponse.data?.name).toEqual("test25");
    expect(putResponse.data?.email).not.toEqual(postResponse.data?.email);
    expect(putResponse.data?.phone).toEqual(postResponse.data?.phone);

    await rollBack(`/api/user/${putBody.data?.id}`);
  });

  test('should get all a user', async () => {
    const { body: postBody } = await request(app)
      .get('/api/user')
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .expect('Content-Type', /json/)
      .expect(200)

    const postResponse: IResponseApi<IUserWOP[]> = postBody;

    expect(postResponse.data?.length).toBeGreaterThan(0)
    expect(postResponse.ok).toBeTruthy()
  });


  test('should get a specific user by id', async () => {
    const { body: getBody } = await request(app)
      .get('/api/user/df7e2cef-c58a-475a-91c5-f12fd8efc7de')
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .expect('Content-Type', /json/)
      .expect(200)

    const getResponse: IResponseApi<IUserWOP> = getBody;

    expect(getResponse.ok).toBeTruthy()
    expect(getResponse.data?.id).toEqual("df7e2cef-c58a-475a-91c5-f12fd8efc7de")
  });


  test('should get a specific user by id', async () => {
    const { body: postBody } = await request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: 'test', email: "test@gmail.com", password: "123456", phone: "5589747895" })
      .expect('Content-Type', /json/)
      .expect(201)

    const postResponse: IResponseApi<IUserWOP> = postBody;

    const { body: deleteBody } = await request(app)
      .delete(`/api/user/${postResponse.data?.id}`)
      .set('Accept', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)


    const deleteResponse: IResponseApi<IUserWOP> = deleteBody;
    expect(deleteResponse.ok).toBeTruthy()
    expect(deleteResponse.msg).toBe(`El usuario con el id '${postResponse.data?.id}' fue eliminado`)
  });



})