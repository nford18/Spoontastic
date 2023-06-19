const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const json = require('json')

app.use(express.static('public'));

const uri = 'YOUR CONNECTION STRING' 

const sessionStore = new MongoDBStore({
	uri: uri,
	ttl: 14 * 24 * 60 * 60,
	collection: 'FIXME'
});

app.use(session({ 
	secret: 'mousepad dog',
	resave: false,
	saveUninitialized: false,
	store: sessionStore
}));

sessionStore.on('error', function(error){
	console.log(error);
});

passport.serializeUser(function(user, done) {
	console.log("Serializing -------> ");
	console.log(user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
	console.log("Deserializing -------> ");
	console.log(obj);
  done(null, obj);
});

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: "YOUR CLIENT ID",
    clientSecret: "YOUR SECRET KEY",
    callbackURL: "http://localhost:8080/verify",
    scope: [ 'user:email' ],
  },
	function(accessToken, refreshToken, profile, done){
		process.nextTick(function() {
			return done(null, profile);
		})
	}
));

const port = 8080;

//const Candy = require('./candy');
//const candyRoutes = require('./candyRoutes')(app);

const Spoon = require('./spoon')


app.get('/', function(req, res){
	res.render('index', { user: req.user });
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/login', (req, res) => {
	res.send('You must login.');
});

app.get('/verify',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    req.session.save(err => {
	if(err){
		console.log(err);
	}
    });
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.redirect('/');
	});
});

app.get('/spoonacularAPI', (req, res) =>{
    res.send(json(Spoon))
});

app.listen(port, async () => { 
	await mongoose.connect(uri);
	console.log("Up and running.");
});