const express = require('express')
const bodyParser = require('body-parser')

const expressMiddleWare = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())

  // Should technically do a redirect
  // router.get('/theme-toggle', (request, response) => {
  //   console.info(request.headers, response.headers)
  //   response.send({ data: { text: 'hello world' } })
  // })
}

module.exports = expressMiddleWare