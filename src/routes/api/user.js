const user = require('../../models/user');
const functions = require('../../shared/functions');

module.exports = (express) => {

  const router = express.Router();

  router.get('/users', (req, res) => {
    // Find all users
    user.findAll( (data) => {
      // If data exists and data (array) is longer than 0
      if (data && data.length > 0) {
        // Respond with JSON, status OK
        res.status(200).json(data);
      } else {
        // Respond with JSON, status Not Found
        res.status(404).json();
      }
    }, (error) => {
      // Respond with JSON, status Internal Server Error
      res.status(500).json({
        'developerMessage': error
      });
    });
  });

  router.post('/users', (req, res) => {
    // If user required data is set
    if (req.body.name && req.body.name.length > 0) {
      // Create user
      user.create(req.body, (data) => {
        // If data exists
        if (data) {
          // Respond with JSON, status OK
          res.status(200).json(data);
        } else {
          // Respond with JSON, status Internal Server Error
          res.status(500).json();
        }
      }, (error) => {
        // Respond with JSON, status Internal Server Error
        res.status(500).json({
          'developerMessage': error
        });
      });
    } else {
      // Respond with JSON, status Unprocessable Entity
      res.status(422).json({
        'developerMessage': 'User must have a name.'
      });
    }
  });

  router.delete('/users/:id', (req, res) => {
    // Delete user by id
    user.destroy(req.params, (data) => {
      // If data exists
      if (data) {
        // Respond with JSON, status OK
        res.status(200).json(data);
      } else {
        // Respond with JSON, status Not Found
        res.status(404).json();
      }
    }, (error) => {
      // Respond with JSON, status Internal Server Error
      res.status(500).json({
        'developerMessage': error
      });
    });
  });

  router.get('/users/:id', (req, res) => {
    // Find user by id
    user.find(req.params, (data) => {
      // If data exists
      if (data) {
        // Respond with JSON, status OK
        res.status(200).json(data);
      } else {
        // Respond with JSON, status Not Found
        res.status(404).json();
      }
    }, (error) => {
      // Respond with JSON, status Internal Server Error
      res.status(500).json({
        'developerMessage': error
      });
    });
  });

  router.post('/users/:id', (req, res) => {
    // If user required data is set
    if (req.body.name && req.body.name.length > 0) {
      req.body.id = req.params.id;
      // Update user by id
      user.update(req.body, (data) => {
        // If data exists
        if (data) {
          // Respond with JSON, status OK
          res.status(200).json(data);
        } else {
          // Respond with JSON, status Not Found
          res.status(404).json();
        }
      }, (error) => {
        // Respond with JSON, status Internal Server Error
        res.status(500).json({
          'developerMessage': error
        });
      });
    } else {
      // Respond with JSON, status Unprocessable Entity
      res.status(422).json({
        'developerMessage': 'User must have a name.'
      });
    }
  });

  return router;

};
