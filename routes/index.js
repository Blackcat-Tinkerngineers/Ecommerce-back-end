const router = require('express').Router();
const express = require('express');
const apiRoutes = require('./api');


router.use('apiRoutes', apiRoutes);

router.use((req, res) => {
  res.send("Success!");
});

module.exports = router;