const express = require('express')
const webpush = require('web-push')
const cors = require('cors')
const bodyParser = require('body-parser')

const PUBLIC_VAPID =
  'BIpGXtXubCD-QAa2bz_e0z4uGGdanNPDkGc5ZlKDMe9BVcGF8Lij2SfcF0Bb0Ds5PWyimoygTQoxjJm_WigD58M'
const PRIVATE_VAPID = 'ihVdQLwQlyAE5vEC3ZClMUDboPmKq5IaxLU4HwADAcU'

const fakeDatabase = []

const app = express()

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID)

app.post('/subscription', (req, res) => {
  const subscription = req.body
  fakeDatabase.push(subscription)
})

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
    },
  }

  const promises = []
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  })
  Promise.all(promises).then(() => res.sendStatus(200))
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})