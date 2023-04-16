
import request, { Response } from 'supertest';
import express from 'express';
import router from '../../config/routes';
import cors from 'cors'
import { ICategory } from '../../categories/entity';
import { IResponseApi } from '../../interfaces';
const app = express();
let server:any;


beforeAll(() => {
  app.use(cors({
    origin: '*'
  }))
  app.use(express.json());
  app.use('/api', router)
  server = app.listen(4040)
})

afterAll(async() => {
  await server.close()
})

const rollBack = async(path: string):Promise<Response> => {
  return await request(app)
                    .delete(path)
                    .set('Accept', 'application/json')
                    .expect(200)
}

describe('Test in category controller', () => { 
  /* test('should get all categories in db', async () => { 
    const response = await request(app)
                    .get('/api/category')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)

    expect(response.body).toEqual({
      ok: true,
      data: [
        { id: 'cba2812e-e2e3-4032-9ef5-7e34147fbf3a', name: 'Electronics' }
      ]
    });
  }) */

  test('should get only one record', async () => { 
    const response = await request(app)
                    .get('/api/category/57b5ea44-89f0-45b2-8ecf-1d81eefbea5a')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)

    expect(response.body.ok).toBe(true);
    expect(response.body.data.name).toBe("Electronics");
  });

  test('should get a error when category no exist', async () => { 
    const response = await request(app)
                    .get('/api/category/cba2812e-e2e3-4032-9ef5-7e34147fbfa')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
    expect(response.body).toEqual({ ok: false, error: 'La categoria no fue encontrada' })
  });


  test.only('should create a new category', async () => { 
    const { body } = await request(app)
                    .post('/api/category')
                    .set('Accept', 'application/json')
                    .send({name: 'Ropa y accesorios'})
                    .expect('Content-Type', /json/)
                    .expect(201)

    const response: IResponseApi<ICategory> = body

    expect(response.ok).toBe(true)
    expect(response.data?.name).toEqual("Ropa y accesorios")

    await rollBack(`/api/category/${response.data?.id}`)
  });


  test('should update a category', async () => { 
    // Create category
    const { body: postBody } = await request(app)
                    .post('/api/category')
                    .set('Accept', 'application/json')
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
                    .send({name: 'Belleza y cuidado personal TEST'})
                    .expect('Content-Type', /json/)

    const postResponse: IResponseApi<ICategory> = postBody
    expect(postResponse.ok).toBe(true)
    expect(postResponse.data?.name).toBe("Belleza y cuidado personal TEST")
    
    //? Delete category
    const {body : deleteBody} = await request(app)
                    .delete(`/api/category/${postResponse.data?.id}`)
                    

    const deleteResponse: IResponseApi<ICategory> = deleteBody
    expect(deleteResponse.data?.name).toBe("Belleza y cuidado personal TEST")
    expect(deleteResponse.msg).toBe(`La categoria con el id '${deleteResponse.data?.id}' fue eliminada`)
  });
});