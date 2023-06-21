const Router = require('express').Router();
const randomAns = require('../utils/randomAns');
const compareAns = require('../utils/compareAns');

Router.put('/new', function (req, res) {
  const { length, digitalSet } = req.query;

  const { ans, hint } = randomAns(length, digitalSet);
  req.session.ans = ans;

  return res.status(200).send({ ...hint });
});

Router.get('/gaming', function (req, res) {
  const { ans } = req.session;

  res.send({ gaming: !!ans });
});

Router.get('/:ans', function (req, res) {
  if (!req.session.ans) return res.status(400).send({ msg: 'Bad Request.' });

  const { ans } = req.params;

  try {
    const result = compareAns(ans, req.session.ans);
    const bingo = result.a === ans.length;

    if (bingo) req.session.destroy();

    res.setHeader('Content-Type', 'application/json');
    return res.send({
      bingo,
      msg: `${result.a}A ${result.b}B`,
      invalid: false
    });
  } catch (err) {
    res.setHeader('Content-Type', 'text/plain');
    res.send({ bingo: false, msg: err, invalid: true });
  }
});

Router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send({ bingo: false, msg: 'Invalid Input.', invalid: true });
});

module.exports = Router;
