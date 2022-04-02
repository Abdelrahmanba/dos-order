const express = require('express')
const router = express.Router()
const request = require('request')

// get by id
router.get('/purchase/:id', function (req, res, next) {
  const id = req.params.id
  request(process.env.catalog + '/info/' + id, { json: true }, (err, response, body) => {
    if (err) {
      return res.send(err)
    }
    if (body.message) {
      return res.send({ message: 'something went worng' })
    }
    if (body.stock <= 0) {
      return res.send({ message: 'out of stock' })
    }
    request(
      process.env.catalog + '/book/' + id + '?stock=-1',
      { json: true, method: 'PUT' },
      (err, response2, body) => {
        if (response2.statusCode == 200) {
          res.send({ message: 'thank you for your purchase.' })
        } else {
          res.send({ message: 'something went wrong' })
        }
      }
    )
  })
})

module.exports = router
