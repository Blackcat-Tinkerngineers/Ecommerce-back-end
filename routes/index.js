const router = require('express').Router();
const apiRoutes = require('./api');


router.use('/api', apiRoutes);
router.use((req, res) => {
  res.send(
    [
      {
        category_name: 'Shirts',
      },
      {
        category_name: 'Shorts',
      },
      {
        category_name: 'Music',
      },
      {
        category_name: 'Hats',
      },
      {
        category_name: 'Shoes',
      },
    ]
  );
});

module.exports = router;