
import request, { Response } from 'supertest';
import express from 'express';
import router from '../../config/routes';
import cors from 'cors'
import { ICategory } from '../../categories/entity';
import { IResponseApi } from '../../interfaces';
const app = express();
let server:any;
let token: any;

const categoryId = process.env.CATEGORY_ID_TEST

beforeAll(async() => {
  app.use(cors({
    origin: '*'
  }))
  app.use(express.json());
  app.use('/api', router);
  server = app.listen(4040);

  const {text} = await request(app)
                  .post('/api/auth/login')
                  .set('Accept', 'application/json')
                  .send({email: 'test@gmail.com', password: "123456"})

  const {data} = JSON.parse(text)
  token = data.accessToken

})

afterAll(async() => {
  await server.close()
})
const rollBack = async(path: string):Promise<Response> => {
  console.log({path});
  return await request(app)
                    .delete(path)
                    .set('Accept', 'application/json')
                    .set({ Authorization: `Bearer ${token}` })
                    .expect(200)
}

describe('Test in category controller', () => { 
  test('should get only one record', async () => { 
    console.log({token});
    const response = await request(app)
                    .get(`/api/category/${categoryId}`)
                    .set('Accept', 'application/json')
                    .set({ Authorization: `Bearer ${token}` })
                    .expect('Content-Type', /json/)
                    .expect(200)

    expect(response.body.ok).toBe(true);
    expect(response.body.data.name).toBe("Electronica");
  });

  test('should get a error when category no exist', async () => { 
    const response = await request(app)
                    .get(`/api/category/cba2812e-e2e3-4032-9ef5-7e34147fbfa`)
                    .set('Accept', 'application/json')
                    .set({ Authorization: `Bearer ${token}` })
                    .expect('Content-Type', /json/)
                    .expect(404)
    expect(response.body).toEqual({ ok: false, error: 'La categoria no fue encontrada' })
  });


  test('should create a new category', async () => { 
    const { body } = await request(app)
                    .post('/api/category')
                    .set('Accept', 'application/json')
                    .set({ Authorization: `Bearer ${token}` })
                    .send({name: 'Ropa y accesorios'})
                    .expect('Content-Type', /json/)
                    // .expect(201)
    const response: IResponseApi<ICategory> = body

    expect(response.ok).toBe(true)
    expect(response.data?.name).toEqual("Ropa y accesorios")
    console.log({response});
    await rollBack(`/api/category/${response.data?.id}`)
  });


  test('should update a category', async () => { 
    // Create category
    const { body: postBody } = await request(app)
                    .post('/api/category')
                    .set('Accept', 'application/json')
                    .set({ Authorization: `Bearer ${token}` })
                    .send({name: 'Ropa'})
                    .expect('Content-Type', /json/)
                    .expect(201)

    const postResponse: IResponseApi<ICategory> = postBody
    expect(postResponse.ok).toBe(true)
    expect(postResponse.data?.name).toBe("Ropa")

    // Update Category
    const {body : putBody} = await request(app)
                    .put(`/api/category/${postResponse.data?.id}`)
                    .set('Accept', 'application/json')
                    .set({ Authorization: `Bearer ${token}` })
                    .send({name: 'Ropa y accesorios'})
                    .expect('Content-Type', /json/)

    const putResponse: IResponseApi<ICategory> = putBody
    expect(putResponse.data?.name).toBe("Ropa y accesorios")
    expect(putResponse.msg).toBe(`La categoria con el id '${putResponse.data?.id}' fue actualizada`)

    await rollBack(`/api/category/${putResponse.data?.id}`)
  });

  test('should delete a category', async () => { 
    //? Create category
    const { body: postBody } = await request(app)
                    .post('/api/category')
                    .set('Accept', 'application/json')
                    .set({ Authorization: `Bearer ${token}` })
                    .send({name: 'Belleza y cuidado personal TEST'})
                    .expect('Content-Type', /json/)

    const postResponse: IResponseApi<ICategory> = postBody
    expect(postResponse.ok).toBe(true)
    expect(postResponse.data?.name).toBe("Belleza y cuidado personal TEST")
    
    //? Delete category
    const {body : deleteBody} = await request(app)
                    .delete(`/api/category/${postResponse.data?.id}`)
                    .set({ Authorization: `Bearer ${token}` })
                    
    console.log({deleteBody});
    const deleteResponse: IResponseApi<ICategory> = deleteBody
    // expect(deleteResponse.data?.name).toBe("Belleza y cuidado personal TEST")
    expect(deleteResponse.msg).toBe(`La categoria con el id '${postResponse.data?.id}' fue eliminada`)
  });
});