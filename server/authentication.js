const {verify} = require('./jwt');
const sessions = require('./mysql/sessions');

module.exports = async function (req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return next();
  }

  if (auth.indexOf('Bearer ') !== 0) {
    return res.sendStatus(401);
  }

  try {
    const token = auth.slice(7);
    const {session} = verify(token);

    const sessionIsActive = await sessions.exists(session);

    if (sessionIsActive) {
      res.locals.session = session;
    }
    next();

  } catch(err) {
    console.log(err);
    res.sendStatus(401);
  }
};
