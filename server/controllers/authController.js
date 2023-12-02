module.exports = {
  requireAuth: (req, res, next) => {
    console.log('🔐 Require Auth');
    const { token } = req.cookies;

    if (!token || token !== 'admin') {
      return res.status(401).send('You must be signed in to view this page');
    }

    next();
  },
  login: (req, res, next) => {
    console.log('🔑 Login');
    const { user, pass } = req.body;

    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin', {
        httpOnly: true,
        secure: false,
      });
      return res.redirect('/secret');
    }

    return res.status(401).send('unsuccessful login attempt');
  },
};
