const httpStatus = require('http-status');
const logger = require('../config/logger');
const { roles } = require('../config/roles');
const { User, Token, Admin } = require('../models');
const ApiError = require('../utils/ApiError');
const tokenService = require('./token.service');

const createUser = async (user) => {
  const { role } = user;
  if (await User.isEmailTaken(user.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Email is already taken. Email: ${user.email}`);
  }
  if (role === 'admin') {
    return await createAdmin(user);
  } else if (role === 'user') {
    return await createUserAccount(user);
  } 
  throw new ApiError(httpStatus.BAD_REQUEST, `Invalid role, supported roles are: ${roles.join(', ')}`);
};

const createUserAccount = async (user) => {
  return await new User(user).save();
};

const createAdmin = async (admin) => {
  return await new Admin(admin).save();
};
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  createUser,
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};
