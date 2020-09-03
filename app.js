const express = require('express')
const axios = require('axios')
const redis = require('redis')
const responseTime = require('response-time')
const { promisify } = require('util')

const app = express()
app.use(responseTime())

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
})
const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

app.get('/rockets', async (req, res, next) => {
  try {
    const reply = await GET_ASYNC('rockets')
    if (reply) {
      console.log('using cached data')
      res.send(JSON.parse(reply))
      return
    }
    const respone = await axios.get('https://api.spacexdata.com/v3/rockets')
    const saveResult = await SET_ASYNC(
      'rockets',
      JSON.stringify(respone.data),
      'EX',
      5
    )
    console.log('new data cached', saveResult)
    res.send(respone.data)
  } catch (error) {
    res.send(error.message)
  }
})

app.get('/rockets/:rocket_id', async (req, res, next) => {
  try {
    const { rocket_id } = req.params
    const reply = await GET_ASYNC(rocket_id)
    if (reply) {
      console.log('using cached data')
      res.send(JSON.parse(reply))
      return
    }
    const respone = await axios.get(
      `https://api.spacexdata.com/v3/rockets/${rocket_id}`
    )
    const saveResult = await SET_ASYNC(
      rocket_id,
      JSON.stringify(respone.data),
      'EX',
      5
    )
    console.log('new data cached', saveResult)
    res.send(respone.data)
  } catch (error) {
    res.send(error.message)
  }
})

app.listen(3000, () => console.log('🚀 on port 3000'))
