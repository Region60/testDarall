import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/clients', async (req, res) => {
  const clients = await prisma.client.findMany()
  res.json(clients)
})

app.get('/orders', async (req,res) =>{
  const orders = await prisma.order.findMany()
  res.json(orders)
})

app.get('order:id',async(req, res) => {
const{id} = req.params
const order = await prisma.order.findUnique({where: {id: Number(id)}})
})

app.post(`/client`, async (req, res) => {
  try{
    const{phone,name} = req.body
    const result = await prisma.client.create({
      data: {
        phone,
        name 
      },
    })
    res.json(result)
  }catch(e){
    console.log(e)
  }
})

app.post(`/order`, async (req, res) => {
  const { title, content, authorPhone } = req.body
  const result = await prisma.order.create({
    data: {
      client:{connect: {phone: authorPhone}}
    },
  })
  res.json(result)
})

app.delete(`/order/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.order.delete({
    where: { id: Number(id) },
  })
  res.json(post)
})


// ... your REST API routes will go here

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)