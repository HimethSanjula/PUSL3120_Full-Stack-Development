const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();
const { errorConverter, errorHandler } = require('./middlewares/error');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const { handleChat } = require('./controllers/chat.controller');
const app = express();
const expressWs = require('express-ws')(app);
app.use(cors());
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use('/api', routes);

app.get('/health', (req, res) => {
  // get package.json version
  const { version } = require('./package.json');
  res.status(200).json({ message: 'Healthy', version });
})
 
app.use(errorConverter);

app.use(errorHandler);
app.locals.users = {};
app.locals.admins = {};

const PORT = process.env.PORT || 5000;

app.ws('/chat/:from', (ws, req) => handleChat(ws, req, app.locals.users, app.locals.admins));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
