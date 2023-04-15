import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './config/routes'


const PORT = process.env.SERVER_PORT

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(express.json());

//Api prefix
app.use('/api', router)

app.listen(PORT,() => {
  console.log("App listen por el puerto", PORT);
})

