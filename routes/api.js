const router = require('express').Router();

const Session = require('../middleware/session');

router.use(Session.RedisSessionStore);

router.get('/home', (req, res, next) => {
  return res.json({ message: 'API Home Route' });
});

router.post('/login', (req, res, next) => {
  const u = 'flyg101';
  const p = 'password';
  const { username, password, name } = req.body;
  if (username === u && password === p) {
    const { data } = require('../constants');
    const session = req.session;
    session.username = username;
    session.name = name;
    session.data = data;
    res.json({ message: 'SUCCESSFUL!' });
  } else {
    res.status(401).json({ message: 'UNAUTHORIZED!!!' });
  }
});

module.exports = router;
