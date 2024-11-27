const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const mongoose = require('./db');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playlist');
const app = express();

// Middleware
app.use(express.static('public')); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/radioStationSessions',
        }),
        cookie: { maxAge: 30 * 60 * 1000 }, // 30 minutes
    })
);

app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);
app.use('/playlist', playlistRoutes);

app.get('/', (req, res) => {
    res.redirect('/mainpage');
});

app.get('/mainpage', (req, res) => {
    res.render('mainpage');
});


app.get('/login', (req, res) => {
    res.render('login'); 
});

const Playlist = require('./models/Playlist'); // Import the Playlist model

app.get('/index2', async (req, res) => {
    try {
        const playlists = await Playlist.find(); // Fetch playlists from MongoDB
        res.render('index2', { playlists }); // Pass playlists to the view
    } catch (err) {
        console.error('Error fetching playlists:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/create', (req, res) => {
    res.render('create-playlist'); 
});


app.get('/song-search', (req, res) => {
    res.render('song-search'); // Render the song search page
});

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes); // Use the index router


// Server start
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

