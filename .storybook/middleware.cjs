const express = require('express');
const bodyParser = require('body-parser');

const expressMiddleWare = router => {
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());

    router.get('/', (request, response) => {
      console.info(request.headers, response.headers)
      response.send({ data: { text: 'hello world' } })
    })
};

module.exports = expressMiddleWare;