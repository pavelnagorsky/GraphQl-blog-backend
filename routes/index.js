const router = require('express').Router();

const fileControllers = require('../controllers/files');
const graphqlController = require('../controllers/graphQl');

router.put('/post-image', fileControllers.postImage);

router.use('/graphql', graphqlController);

module.exports = router;