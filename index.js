const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const authRouter = require('./routes/authRoutes');
require('./models/User');
require('./services/passport');

// mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongooseUri, { useMongoClient: true });

// initialize express app
const app = express();
app.use(cookieSession({
  maxAge: 30 * 24 * 360 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(process.env.PORT || 3000);
});
