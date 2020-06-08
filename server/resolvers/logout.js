const sessions = require('../mysql/sessions');
module.exports = async function (data, req) {
  const session = req.res.locals.session;

  if (!session || session.userId !== data.id) {
    throw new Error('Forbidden');
  }

  return await sessions.delete(req.res.locals.session);
};
