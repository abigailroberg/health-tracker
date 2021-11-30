const jwt = require('jsonwebtoken');

const secret = 'healthtrackersecret';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // split token string into array, remove last index, trim whitepsace
    if (req.headers.authorization) {token = token.split(' ').pop().trim();}

    // no token err message
    if (!token) return req

    // verify token
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } 
    // invalid token catch
    catch {
      console.log('Invalid token');
    }
    
    return req
  },
  // add user data to token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    // return authed with expiration data
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
