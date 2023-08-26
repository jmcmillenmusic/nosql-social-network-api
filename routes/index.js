// Requiring Express Router
const router = require('express').Router();
const apiRoutes = require('./api');

// Start all API routes with /api
router.use('/api', apiRoutes);

// Error handling for routes
router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;