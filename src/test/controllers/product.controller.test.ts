
import request, { Response } from 'supertest';
import express from 'express';
import router from '../../config/routes';
import path from 'path';
import cors from 'cors'
import { IResponseApi } from '../../interfaces';
import { IProduct } from '../../products/entity';

const app = express();
let server: any;
let token: any;


beforeAll(async () => {
  app.use(cors({
    origin: '*'
  }))
  app.use(express.json());
  app.use('/api', router);
  server = app.listen(4041);

  const { text } = await request(app)
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .send({ email: 'saidnnnn@gmail.com', password: "123456" })

  const { data } = JSON.parse(text)
  token = data.accessToken

})

afterAll(async () => {
  await server.close()
})
const rollBack = async (path: string): Promise<Response> => {
  return await request(app)
    .delete(path)
    .set('Accept', 'application/json')
    .set({ Authorization: `Bearer ${token}` })
    .expect(200)
}

describe('Test in category controller', () => {

  test("should create product", async () => {
    const { body: postBody } = await request(app)
      .post('/api/product')
      .set("Content-Type", "multipart/form-data")
      .set({ Authorization: `Bearer ${token}` })
      .field('productData', JSON.stringify({ "name": "producto test backend", userId: "df7e2cef-c58a-475a-91c5-f12fd8efc7de", description: "Hola soy una prueba", categoryId: "d79c3133-400c-4873-8721-65d311143a4d" }))
      .attach('file', "uploads/test.jpg")
      .expect(201)

    const postResponse: IResponseApi<IProduct> = postBody;
    expect(postResponse.ok).toBeTruthy();
    expect(postResponse.data?.id).toBeDefined();
    expect(postResponse.data?.image).toBeDefined();

    await rollBack(`/api/product/${postResponse.data?.id}`);
  });


  test("should update product", async () => {
    const { body: postBody } = await request(app)
      .post('/api/product')
      .set("Content-Type", "multipart/form-data")
      .set({ Authorization: `Bearer ${token}` })
      .field('productData', JSON.stringify({ "name": "producto test backend", userId: "df7e2cef-c58a-475a-91c5-f12fd8efc7de", description: "Hola soy una prueba", categoryId: "d79c3133-400c-4873-8721-65d311143a4d" }))
      .attach('file', "uploads/test.jpg")
      .expect(201)

    const postResponse: IResponseApi<IProduct> = postBody;
    expect(postResponse.ok).toBeTruthy();
    expect(postResponse.data?.id).toBeDefined();
    expect(postResponse.data?.image).toBeDefined();

    const { body: putBody } = await request(app)
      .put(`/api/product/${postResponse.data?.id}`)
      .set("Content-Type", "multipart/form-data")
      .set({ Authorization: `Bearer ${token}` })
      .field('productData', JSON.stringify({ "name": "producto test backend2", userId: "df7e2cef-c58a-475a-91c5-f12fd8efc7de", description: "Hola soy una prueba 2", categoryId: "d79c3133-400c-4873-8721-65d311143a4d" }))
      .expect(200)

    const putResponse: IResponseApi<IProduct> = putBody;
    expect(postResponse.ok).toBeTruthy();
    expect(postResponse.data?.id).toEqual(postResponse.data?.id);

    await rollBack(`/api/product/${putResponse.data?.id}`);
  });


  test("should get product with specific id", async () => {
    const { body: postBody } = await request(app)
      .post('/api/product')
      .set("Content-Type", "multipart/form-data")
      .set({ Authorization: `Bearer ${token}` })
      .field('productData', JSON.stringify({ "name": "producto test backend", userId: "df7e2cef-c58a-475a-91c5-f12fd8efc7de", description: "Hola soy una prueba", categoryId: "d79c3133-400c-4873-8721-65d311143a4d" }))
      .attach('file', "uploads/test.jpg")
      .expect(201)

    const postResponse: IResponseApi<IProduct> = postBody;

    const { body: getBody } = await request(app)
      .get(`/api/product/${postResponse.data?.id}`)
      .set("Content-Type", "multipart/form-data")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)

    const getResponse: IResponseApi<IProduct> = getBody;

    expect(getResponse.data?.description).toEqual("Hola soy una prueba")

    await rollBack(`/api/product/${getResponse.data?.id}`);
  });


  test("should get a error with the msg 'Producto no encontrado' when it no exist", async () => {
    const { body: getBody } = await request(app)
      .get(`/api/product/4584d54ds54sd5665`)
      .set("Content-Type", "multipart/form-data")
      .set({ Authorization: `Bearer ${token}` })
      .expect(404)

    const getResponse: IResponseApi<IProduct> = getBody;

    expect(getResponse.error).toBe('Producto no encontrado');
    expect(getResponse.ok).toBeFalsy();

  });


  test("should get a products with userId", async () => {
    const { body: getBody } = await request(app)
      .get(`/api/product/me/df7e2cef-c58a-475a-91c5-f12fd8efc7de`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)

    const getResponse: IResponseApi<IProduct[]> = getBody;

    expect(getResponse.data?.length).toBeGreaterThan(0);
  });


  test("should delete a product", async () => {

    const { body: postBody } = await request(app)
      .post('/api/product')
      .set("Content-Type", "multipart/form-data")
      .set({ Authorization: `Bearer ${token}` })
      .field('productData', JSON.stringify({ "name": "producto test backend", userId: "df7e2cef-c58a-475a-91c5-f12fd8efc7de", description: "Hola soy una prueba", categoryId: "d79c3133-400c-4873-8721-65d311143a4d" }))
      .attach('file', "uploads/test.jpg")
      .expect(201)

    const postResponse: IResponseApi<IProduct> = postBody;

    const { body: deleteBody } = await request(app)
      .delete(`/api/product/${postResponse.data?.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)

    const deleteResponse: IResponseApi<IProduct> = deleteBody;
  
    expect(deleteResponse.msg).toBe(`El producto con el id '${postResponse.data?.id}' fue eliminado`)
  });


});